import "firebase/auth";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { RiGoogleFill } from "react-icons/ri";
import { useFormManager } from "../../../../base/hooks/useFormManager";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useRegister } from "../hooks/useRegister";
import { registerValidator } from "./registerValidator";

const RegisterPage = () => {
  const { methods, handleSubmit } = useFormManager(registerValidator);
  const { error, isLoading, handleRegister } = useRegister();
  const { signInWithGoogle } = useGoogleAuth("register");

  return (
    <div className='w-full h-full flex justify-center items-center min-h-[80dvh]'>
      <div className='w-full max-w-md p-8 space-y-3 rounded-lg '>
        <h2 className='text-2xl font-bold text-center text-primary mb-8'>Create account</h2>

        {error && <p className='text-destructive text-center text-sm'>{error.message}</p>}

        <Button
          variant={"secondary"}
          className='w-full py-3 space-x-2 flex items-center'
          onClick={signInWithGoogle}
        >
          <RiGoogleFill className='w-7 h-7' />
          <span className='font-medium text-lg block'>Register with Google</span>
        </Button>

        <div className='flex items-center justify-between mt-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='px-2 text-gray-500'>OR</span>
          <hr className='flex-grow border-gray-300' />
        </div>

        <FormProvider {...methods}>
          <form className='' onSubmit={handleSubmit(handleRegister)}>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Name</label>
                <Input
                  name='name'
                  type='text'
                  required
                  className='block w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <Input
                  name='email'
                  type='email'
                  required
                  className='block w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Password</label>
                <Input
                  name='password'
                  type='password'
                  required
                  className='block w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
            </div>
            <Button className='mt-8 w-full py-3 font-semibold'>Submit</Button>
          </form>
        </FormProvider>

        <p className='mt-8 text-sm text-center text-gray-600'>
          Have an account?
          <Link href='/auth/login' className='text-primary font-semibold hover:underline'>
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
