import { ErrorMessage, Field, useField, Form, Formik } from 'formik';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import * as yup from 'yup';
import Button from '@atoms/Button/Button';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import emailjs from '@emailjs/browser';
import FormInput from '@atoms/FormInput/FormInput';
import IAsset from '@models/IAsset';
import { SbImage } from '@atoms/SbImage/SbImage';

export interface IContactForm extends SbBlokData {
  readonly title: string;
  readonly text: string;
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly messageLabel: string;
  readonly messagePlaceholder: string;
  readonly sendLabel: string;
  readonly backgroundPattern: IAsset;
  readonly backgroundPatternSize: number;
  readonly requiredErrorMessage: string;
  readonly nameErrorMessage: string;
  readonly emailErrorMessage: string;
  readonly submitErrorMessage: string;
  readonly submitSuccessMessage: string;
}

const initialStatus = {
  success: false,
  attempted: false,
  statusMessage: '',
};

type StatusType = typeof initialStatus;

type IContactFormFeedback = {
  status: StatusType;
  actions: {
    setStatus: (status: StatusType) => void;
    resetForm: () => void;
  };
};

const ContactFormFeedback = ({ actions, status }: IContactFormFeedback) => {
  function handleClick() {
    actions?.setStatus(initialStatus);
    actions?.resetForm();
  }

  return (
    <>
      <div>{status.statusMessage}</div>
      {!status.success && (
        <Button onClick={() => handleClick()}>Try again</Button>
      )}
    </>
  );
};

const ContactForm = ({
  blok,
  primaryImage,
  secondaryImage,
}: {
  blok: IContactForm;
  primaryImage: IAsset;
  secondaryImage: IAsset;
}) => {
  const {
    title,
    text,
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    emailErrorMessage,
    messageLabel,
    messagePlaceholder,
    sendLabel,
    requiredErrorMessage,
    nameErrorMessage,
    submitErrorMessage,
    submitSuccessMessage,
  } = blok;
  return (
    <div className="grid-container relative gap-y-12">
      {primaryImage && (
        <SbImage
          className="absolute left-20 top-0 z-0 w-1/3 drop-shadow-md"
          src={primaryImage.filename}
          alt={primaryImage.alt}
        />
      )}
      {secondaryImage && (
        <SbImage
          className="absolute bottom-0 right-20 z-0 w-1/3 drop-shadow-md"
          src={secondaryImage.filename}
          alt={secondaryImage.alt}
        />
      )}
      <Formik
        initialStatus={initialStatus}
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            await emailjs.send(
              // process.env.EMAILJS_SERVICE_ID as string,
              'service_zq797g9',
              // process.env.EMAILJS_TEMPLATE_ID as string,
              'template_ykcchef',
              values,
              // process.env.EMAILJS_PUBLIC_KEY as string
              'Jzd7Rjc2_JSba-AWi'
            );
            setStatus({
              success: true,
              attempted: true,
              statusMessage: submitSuccessMessage,
            });
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            setStatus({
              success: false,
              attempted: true,
              statusMessage: submitErrorMessage,
            });
          }

          setSubmitting(false);
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .required(requiredErrorMessage)
            .matches(/^[-,.'aA-zZÀ-ÿ\s]+$/giu, nameErrorMessage),
          email: yup
            .string()
            .required(requiredErrorMessage)
            .email(emailErrorMessage),
          message: yup.string().required(requiredErrorMessage),
        })}
      >
        {({ isSubmitting, isValid, dirty, status, setStatus, resetForm }) => (
          <Form className="z-10 col-span-6 col-start-4 flex flex-col gap-20 items-stretch bg-gradient-to-b from-black-100 to-black text-white p-20 rounded-3xl relative shadow-bold border-yellow border-2">
            <h3 className="w-full text-center">{title}</h3>
            {status.attempted ? (
              <ContactFormFeedback
                actions={{ resetForm, setStatus }}
                status={status}
              />
            ) : (
              <>
                <div className="col-span-6 col-start-4 text-center">{text}</div>
                <div className="flex flex-col items-stretch gap-6">
                  <FormInput
                    className="w-full"
                    name="name"
                    required
                    label={nameLabel}
                    placeholder={namePlaceholder}
                  />
                  <FormInput
                    name="email"
                    required
                    label={emailLabel}
                    placeholder={emailPlaceholder}
                  />
                  <FormInput
                    className="h-40"
                    textArea
                    name="message"
                    required
                    label={messageLabel}
                    placeholder={messagePlaceholder}
                  />
                  <div className="w-full flex justify-end pt-4">
                    <Button
                      iconName="envelope-o"
                      style_={ButtonStyleEnum.Outline}
                      disabled={
                        isSubmitting ||
                        !isValid ||
                        !dirty ||
                        (status && status.success)
                      }
                      className="mt-7.5"
                      type="submit"
                    >
                      {sendLabel}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
