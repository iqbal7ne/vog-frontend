import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldPath } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { ROUTE_PATHS } from '@/lib/constants';

type FormField = {
  name: FieldPath<FormSchemaValues>;
  label: string;
  placeholder: string;
  type?: string;
};

const formFields: FormField[] = [
  { name: "projectName", label: "Project Name", placeholder: "STEALTH" },
  { name: "description", label: "Description", placeholder: "AI Gen platform" },
  {
    name: "mission",
    label: "Mission",
    placeholder: "To make world a better place",
  },
  { name: "audience", label: "Audience", placeholder: "Partnership projects" },
  {
    name: "toneOfVoice",
    label: "Tone of voice",
    placeholder: "Sharp, mellow, high pitch",
  },
  {
    name: "brandVoice",
    label: "Brand voice",
    placeholder: "Playful, professional, caring, bold, witty",
  },
];

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  mission: z.string().optional(),
  audience: z.string().optional(),
  toneOfVoice: z.string().optional(),
  brandVoice: z.string().optional(),
});

type FormSchemaValues = z.infer<typeof formSchema>;

const NewProject = () => {
  //   const navigate = useNavigate();

  const form = useForm<FormSchemaValues>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      formFields.map((f) => [f.name, ""])
    ) as Partial<FormSchemaValues>,
  });

  function onSubmit(values: FormSchemaValues) {
    console.info(values);
  }

  const handleBack = () => {
    // navigate(ROUTE_PATHS.NEW_CONTENT.LIST);
  };

  return (
    <div className="w-full rounded-lg border bg-white p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {formFields.map(({ name, label, placeholder }) => (
              <FormField<FormSchemaValues, FieldPath<FormSchemaValues>>
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="col-span-full flex items-center justify-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Back</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have not finished creating your project. Are you sure
                    you want to leave?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBack}>
                    Leave
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewProject;
