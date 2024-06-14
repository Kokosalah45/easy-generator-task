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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const SigninForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn(values, {
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
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-screen-md w-1/2 m-auto border-2 p-10 rounded-md border-slate-800"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SigninForm;
