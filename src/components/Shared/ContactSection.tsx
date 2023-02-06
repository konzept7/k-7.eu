import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  Stack,
  Box,
  Title,
  CopyButton,
  Tooltip
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconSun, IconPhone, IconMapPin, IconAt, IconMail } from '@tabler/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import bg from '../../assets/bg/contact-bg.svg';

type ContactIconVariant = 'white' | 'gradient';

interface ContactIconStyles {
  variant: ContactIconVariant;
}

const useStyles = createStyles((theme, { variant }: ContactIconStyles) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.brand[9] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
      maxWidth: 1050
    },
    actionButton: {
      backgroundColor: theme.colors.brand[6],
      color: theme.white,
      borderColor: theme.colors.brand[4] + ' !important',
      borderBottom: "0.45em solid",
      borderRadius: theme.radius.md,
      borderLeft: "0.125em solid",
      borderRight: "0.125em solid",
      borderTop: "0.125em solid",
      '&:hover': {
        backgroundColor: theme.colors.brand[8] + ' !important',
      },
      '&:disabled': {
        borderColor: theme.colors.gray[7] + ' !important',
        pointer: 'none',
      }
    },
    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: theme.radius.lg - 2,
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid transparent',
      padding: theme.spacing.xl,
      flex: '0 0 280px',
      margin: 12,
      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Kufam, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
    icon: {
      marginRight: theme.spacing.md,
      backgroundImage:
        variant === 'gradient'
          ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][6]
          } 100%)`
          : 'none',
      backgroundColor: 'transparent',
    },
    description: {
      color: variant === 'gradient' ? theme.black : theme.white,
    },
    contactIconWrapper: {
      display: 'flex',
      alignItems: 'center',
      color: theme.white,
    },
    iconTitle: {
      color: variant === 'gradient' ? theme.colors.gray[6] : theme.colors[theme.primaryColor][0],
    },
  };
});
interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: React.FC<any>;
  title: string;
  description: string;
  copyDisabled?: boolean;
  variant?: ContactIconVariant;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  copyDisabled = false,
  ...others
}: ContactIconProps) {
  const { classes } = useStyles({ variant: "white" });
  return (

    <CopyButton value={description} timeout={5000} {...others}>
      {({ copied, copy }) => (
        <Tooltip disabled={copyDisabled} label={copied ? 'Kopiert!' : 'In die Zwischenablage'} withArrow position="right"
        >
          <div onClick={copy} style={{ cursor: copyDisabled ? undefined : 'pointer' }}
            className={classes.contactIconWrapper}>
            <Box mr="md">
              <Icon size={24} />
            </Box>
            <div>
              <Text size="xs" className={classes.iconTitle}>
                {title}
              </Text>
              <Text className={classes.description}>{description}</Text>
            </div>
          </div>
        </Tooltip>
      )}
    </CopyButton>
  );
}

interface ContactIconsListProps {
  data?: ContactIconProps[];
  variant?: ContactIconVariant;
}



const sendMail = async (replyto: string, fromName: string, subject: string, message: string,) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "to": ["info@k-7.eu"],
    "subject": "K7-Kontaktformular: " + subject,
    "message": `Hallo,\n\n ${fromName} hat über das Kontaktformular der K7-Website folgende Nachricht gesendet:\n\n${message}`,
    "from": replyto,
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    redirect: 'follow',
    headers: headers,
    body: raw
  };

  const response = await fetch(import.meta.env.VITE_MAIL_URL, requestOptions)
  const result = await response.text()
  return result;
}


export default function ContactSection() {
  const { classes, theme } = useStyles({ variant: 'gradient' });
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation();

  const contactData = [
    { title: t('contact.email'), description: 'info@k-7.eu', icon: IconAt },
    // { title: t('contact.phone'), description: '+49 (190) 123 456', icon: IconPhone },
    {
      title: t('contact.adress'), description: 'Roonstraße 23a, 76137 Karlsruhe', icon: IconMapPin
    },
    { title: t('contact.hours'), description: '8.00 bis 17.00 Uhr', icon: IconSun, copyDisabled: true },
  ];

  function ContactIconsList({ data = contactData, variant }: ContactIconsListProps) {
    const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
    return <Stack>{items}</Stack>;
  }

  const form = useForm({
    initialValues: {
      name: '',
      _replyto: '',
      message: '',
      _subject: '',
      _from: '',
    },
    validate: {
      name: (value) => (value && value.length > 5 ? null : t('contact.nameNecessary')),
      message: (value) => (value && value.length > 5 ? null : t('contact.betterWriteSomething')),
      _subject: (value) => (value && value.length > 5 ? null : t('contact.whatIsItAbout')),
      _replyto: (value) => (/^\S+@\S+$/.test(value) ? null : t('contact.invalidEmail')),
    },
  })

  return (
    <Paper shadow="md" radius="lg" style={{ maxWidth: 1050, margin: 'auto', backgroundColor: theme.colors.brand[8] }}>
      <Title align='center' color={theme.white} order={2} my="xl">{t('contact.sendUsAMessage')}</Title>
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text size="lg" weight={700} className={classes.title} sx={{ color: '#fff' }}>
            {t('contact.information')}
          </Text>

          <ContactIconsList variant="white" />
        </div>

        <form onSubmit={form.onSubmit(async (values) => {

          if (!form.validate() || form.values._from !== '') {
            return
          }
          setDisabled(true)
          try {
            await sendMail(values._replyto, values.name, values._subject, values.message)
            showNotification({
              title: t('contact.thanksForMessage'),
              message: t('contact.replySoon'),
              color: 'green',
              icon: <IconMail />,
            })
          } catch (error) {
            console.error(error)
          } finally {
            setDisabled(false)
          }
        }
        )} className={classes.form}>

          <div className={classes.fields}>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
              <TextInput label={t('contact.yourName')} name="name" placeholder={t('contact.yourName') ?? ''}  {...form.getInputProps('name')} />
              <TextInput label={t('contact.yourEmail')} name="_replyto" placeholder="info@k-7.eu" {...form.getInputProps('_replyto')} required />
            </SimpleGrid>

            <TextInput mt="md" label={t('contact.subject')} name="_subject" placeholder={t('contact.subject') ?? ''} required  {...form.getInputProps('_subject')} />

            <Textarea
              mt="md"
              name="text"
              label={t('contact.yourMessage')}
              placeholder={t('contact.pleaseBeExact') ?? ''}
              minRows={4}
              {...form.getInputProps('message')}
            />
            <input type="hidden" name="_from" {...form.getInputProps('_from')} />
            <Group position="right" mt="md">
              <Button loading={disabled} disabled={!form.isDirty() || disabled} size="md" type="submit" className={classes.actionButton}>
                {t('contact.submit')}
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}