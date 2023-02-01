import { Text, Image, Title, Stack } from '@mantine/core'
import { useTranslation } from 'react-i18next';
import Error404Image from '../../assets/error/404.svg'
import K7Page from '../Layout/K7Page'

export default function Error404() {
  const { t } = useTranslation();

  return (
    <K7Page background='dark'>
      <Stack align="center">
        <Title order={1} mb={30}>{t('pageNotFound')}</Title>
        <Image style={{ maxWidth: 400 }} src={Error404Image} alt="Sleeping robot with 404 sign next to it" />
        <Text color="dimmed" >
          {t('pageNotFoundDescription')}
        </Text>
      </Stack>
    </K7Page>
  )
}