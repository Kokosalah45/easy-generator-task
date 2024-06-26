import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  GlobalFormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { EllipsisIcon } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    )
    .min(8)
    .max(20),
  name: z.string().min(2).max(50),
});

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    await signUp(values, {
      onError: (error) => {
        form.setError('root', {
          type: error.code,
          message: error.message,
        });
      },
      onSuccess: () => {
        form.reset();
        navigate('/');
      },
    }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-screen-md w-1/2 m-auto border-2 p-10 rounded-md border-foreground/70"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email..."
                  {...field}
                  className={fieldState.error ? 'border-red-500' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  type="name"
                  placeholder="name..."
                  {...field}
                  className={fieldState.error ? 'border-red-500' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password..."
                  {...field}
                  className={fieldState.error ? 'border-red-500' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <GlobalFormMessage />
        <Button className="flex gap-2" type="submit">
          <span>Submit</span>
          {isLoading && <EllipsisIcon />}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
