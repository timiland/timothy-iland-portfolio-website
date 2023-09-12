import { Form, Formik } from 'formik';
import { SbBlokData } from '@storyblok/react';
import * as yup from 'yup';
import Button from '@atoms/Button/Button';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import emailjs from '@emailjs/browser';
import FormInput from '@atoms/FormInput/FormInput';
import IAsset from '@models/IAsset';
import { SbImage } from '@atoms/SbImage/SbImage';
import Icon from '@atoms/Icon/Icon';
import IconSizeEnum from '@models/enums/IconSizeEnum';
import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

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
  readonly image: IAsset;
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
      <div className="body text-center">{status.statusMessage}</div>
      {!status.success && (
        <Button onClick={() => handleClick()}>Try again</Button>
      )}
    </>
  );
};

const ContactForm = ({
  blok,
  setIsOpen,
}: {
  blok: IContactForm;
  setIsOpen?: (param: boolean) => void;
}) => {
  const {
    emailErrorMessage,
    emailLabel,
    emailPlaceholder,
    image,
    messageLabel,
    messagePlaceholder,
    nameErrorMessage,
    nameLabel,
    namePlaceholder,
    requiredErrorMessage,
    sendLabel,
    submitErrorMessage,
    submitSuccessMessage,
    text,
    title,
  } = blok;

  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref}>
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
              process.env.EMAILJS_SERVICE_ID as string,
              process.env.EMAILJS_TEMPLATE_ID as string,
              values,
              process.env.EMAILJS_PUBLIC_KEY as string
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
          <Form
            role={setIsOpen ? 'dialog' : ''}
            aria-labelledby="ContactFormTitle"
            className="relative grid-container gap-y-12"
          >
            {image && !status.success && !status.attempted && (
              <motion.div
                className="absolute hidden xl:flex left-0 top-[100px] z-0 lg:h-[70%] 2xl:h-[80%]"
                initial={{ translateX: '100px', scale: 0.8 }}
                animate={
                  inView
                    ? { translateX: '0px', scale: 1 }
                    : { translateX: '100px', scale: 0.8 }
                }
                transition={{
                  duration: 0.4,
                }}
              >
                <SbImage
                  className="drop-shadow-lg"
                  src={image.filename}
                  alt={image.alt}
                />
              </motion.div>
            )}
            <div className="relative z-10 xl:col-span-6 xl:col-start-6 flex flex-col gap-y-10 xl:gap-y-20 bg-black text-white px-8 pb-10 pt-20 xl:p-20 rounded-3xl shadow-bold border-yellow border-2">
              {setIsOpen && (
                <button
                  onClick={() => setIsOpen?.(false)}
                  className="top-8 right-8 absolute"
                >
                  <Icon
                    name="cross"
                    size={IconSizeEnum.lg}
                    className="text-white"
                  />
                </button>
              )}
              <h3 id="ContactFormTitle" className="w-full text-center">
                {title}
              </h3>
              {status.attempted ? (
                <ContactFormFeedback
                  actions={{ resetForm, setStatus }}
                  status={status}
                />
              ) : (
                <>
                  <div className="col-span-6 col-start-4 text-center">
                    {text}
                  </div>
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
