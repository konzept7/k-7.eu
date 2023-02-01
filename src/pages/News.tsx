import { Text, Image, Center, Title, Stack } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import Typewriter from '../assets/illustrations/typewriter.svg'
import K7Page from '../components/Layout/K7Page'


export default function News() {
  const { t } = useTranslation()
  return (
    <K7Page background='dark'>
      <Stack align="center">
        <Title order={1} mb={30}>{t('news')}</Title>
        <Image style={{ maxWidth: 400 }} src={Typewriter} alt="Author writing story using an old style typewriter" />
        <Text color="dimmed" >
          {t('newsPage.soon')}
        </Text>
      </Stack>
    </K7Page>
  )
}