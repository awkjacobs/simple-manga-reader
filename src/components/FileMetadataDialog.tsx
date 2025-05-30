import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/utils/tailwind"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

import * as z from "zod"
import { Checkbox } from "@/components/ui/checkbox"

function createMetadataFromFiles(files: File[]): FileMetadata[] {
    return files.map((file) => ({
        originalName: file.name,
        displayName: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        series: "",
        chapter: "",
    }))
}
const formSchema = z
    .object({
        is_new_title: z.boolean().default(false).optional(),
        new_title: z.string().optional(),
        select_title: z.string().optional(),
        type: z.string().nonempty("Type is required"),
    })
    .superRefine((data, ctx) => {
        if (
            data.is_new_title &&
            (!data.new_title || data.new_title.trim() === "")
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["new_title"],
                message:
                    "A title is required when a new title is being imported",
            })
        } else if (
            !data.is_new_title &&
            (!data.select_title || data.select_title.trim() === "")
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["select_title"],
                message:
                    "If this item is part of a series already in your library, please select it",
            })
        }
    })

interface FileMetadata {
    originalName: string
    displayName: string
    series?: string
    chapter?: string
}

interface FileMetadataDialogProps {
    files: File[]
    open: boolean
    onClose: () => void
    onSave: (metadata: FileMetadata[]) => void
}

const titles = [
    {
        label: "Chainsaw Man",
        value: "chainsaw_man",
    },
    {
        label: "Blame!",
        value: "blame!",
    },
] as const

export function FileMetadataDialog({
    files,
    open,
    onClose,
    onSave,
}: FileMetadataDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            is_new_title: false,
            new_title: "", // Remove extension
            select_title: "",
            type: "",
        },
    })

    // ...inside your component...
    const isNewTitle = useWatch({
        control: form.control,
        name: "is_new_title",
    })
    const [metadata, setMetadata] = useState<FileMetadata[]>(() =>
        files.map((file) => ({
            originalName: file.name,
            displayName: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
            series: "",
            chapter: "",
        })),
    )

    useEffect(() => {
        if (open) {
            form.reset({
                is_new_title: false,
                new_title: "",
                type: "",
                select_title: "",
            })
            setMetadata(createMetadataFromFiles(files))
        }
    }, [open, files, form])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Form submitted with values:", values)
        try {
            console.log(values)
        } catch (error) {
            console.error("Form submission error", error)
        }

        onSave(metadata)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit File Details</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mx-auto max-w-3xl space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="is_new_title"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Is this a new title for your
                                            library?
                                        </FormLabel>
                                        <FormDescription>
                                            If this is a new title for your
                                            library you will need to enter a
                                            name
                                        </FormDescription>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        {isNewTitle && (
                            <FormField
                                control={form.control}
                                name="new_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="New Title"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The title of the imported content
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!isNewTitle && (
                            <FormField
                                control={form.control}
                                name="select_title"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Select Title</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value
                                                            ? titles.find(
                                                                  (language) =>
                                                                      language.value ===
                                                                      field.value,
                                                              )?.label
                                                            : "Select a title already in your library or enter a new one"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search titles..." />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No titles found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {titles.map(
                                                                (title) => (
                                                                    <CommandItem
                                                                        value={
                                                                            title.label
                                                                        }
                                                                        key={
                                                                            title.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                "select_title",
                                                                                title.value,
                                                                            )
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                title.value ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0",
                                                                            )}
                                                                        />
                                                                        {
                                                                            title.label
                                                                        }
                                                                    </CommandItem>
                                                                ),
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            This is the name of the book that
                                            will be used in the Library.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the type of the collection being imported" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="book">
                                                Book
                                            </SelectItem>
                                            <SelectItem value="volume">
                                                Volume
                                            </SelectItem>
                                            <SelectItem value="chapter">
                                                Chapter
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        The type of the collection being
                                        imported, whether it&apos;s a book,
                                        volume, chapter, or unspecified.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>

                            <Button type="submit">
                                {form.formState.isSubmitting && (
                                    <LoaderCircle
                                        className={`h-4 w-4 animate-spin`}
                                    />
                                )}
                                {!form.formState.isSubmitting && "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
