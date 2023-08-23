"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TagsInput } from "react-tag-input-component"; 
import { toast } from "sonner"
import { type z } from "zod"
import { catchError, isArrayOfFile } from "@/lib/utils"
import { faqSchema } from "@/lib/validations/faq"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import {addFaqAction} from '@/app/_actions/faqs'


type Inputs = z.infer<typeof faqSchema>


export function EditFaqForm (props:Inputs) {
  const tagFaq = JSON.stringify(props.tag)
  const [selected, setSelected] = React.useState([tagFaq]);
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      console.log('eish')
      try {
        await addFaqAction({
          ...data,
         })
            toast.success("Faq updated successfully.")
            form.reset()
        }   catch (err) {
            catchError(err)
        }
        })
    }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
        name="question"
        control={form.control}
          render={({ field }) => (
            <>
        <FormItem>
          <FormLabel>Question</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.question}
              placeholder="Type question here."
              defaultValue={props.question}
              {...form.register("question")}
              />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.question?.message}
            />
        </FormItem>
        <FormItem>
          <FormLabel>Answer</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type answer here."
              defaultValue={props.answer}
              {...form.register("answer")}
              />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.answer?.message}
            />
        </FormItem>
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormItem>
          <FormLabel>Tag</FormLabel>
          <p>{JSON.stringify(selected)}</p>
          <FormControl>
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.tag?.message}
            />
          </FormItem>
          <TagsInput
          value={selected}
          onChange={setSelected}
          name="tags"
          placeHolder="tags"/>
        </div>
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
            />
            )}
          Update
          <span className="sr-only">Update</span>
        </Button>
          </>
          )}/>
      </form>
    </Form>
    )
  }
