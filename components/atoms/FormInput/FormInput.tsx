import clsx from 'clsx';
import { ErrorMessage, Field, useField, Form, Formik } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  readonly name: string;
  readonly label: string;
  readonly optionalFieldLabel?: string;
  readonly infoTooltip?: string;
  readonly textArea?: boolean;
}

const FormInput = ({
  name,
  label,
  textArea = false,
  required,
  className,
  ...rest
}: Props) => {
  const [, meta] = useField(name);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className={clsx('body-one', {
            'text-red-600': meta.error && meta.touched,
          })}
        >
          {`${label}${required ? ' *' : ''}`}
        </label>
      </div>
      <Field
        {...rest}
        as={textArea ? 'textarea' : 'input'}
        name={name}
        id={name}
        className={clsx(
          'appearance-none rounded-md bg-grey-100 px-5 py-4 ring-2 ring-inset',
          meta.value ? 'text-black' : 'text-grey-500',
          meta.error && meta.touched ? 'ring-red-600' : 'ring-black',
          className
        )}
      />
      {meta.error && meta.touched && (
        <ErrorMessage name={name}>
          {(msg) => <span className="small-copy text-red-600">{msg}</span>}
        </ErrorMessage>
      )}
    </div>
  );
};

export default FormInput;
