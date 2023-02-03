import { Title, Text, Stack, Paper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import K7Page from "../components/Layout/K7Page";
import EmployeeCard from "../components/Shared/EmployeeCard";
import { AuthorResponseItem, getAuthors } from "../utils/queryCms";

export default function Team() {
  const { t, i18n } = useTranslation()
  const [authors, setAuthors] = useState<Array<AuthorResponseItem>>([])
  useEffect(() => {

    getAuthors(i18n.resolvedLanguage).then((response) => {
      setAuthors(response.data.sort((a, b) => (a.attributes?.order ?? 0) - (b.attributes?.order ?? 1)))
    }).catch(error => {
      console.error('error loading authors', error)
      showNotification({
        title: "Fehler beim Laden des Teams",
        color: "red",
        message: "Es ist ein Fehler beim Laden der Teammitglieder aufgetreten."
      })
    }
    )

  }, [i18n.language])

  return (
    <K7Page py={20}>
      <Stack>
        <Title>Unser Team</Title>
        <Text size="md">
          Hier findest du alle Mitarbeiter, die nicht zu scheu sind, sich hier zu zeigen.
        </Text>
        {
          authors.map((author) => {
            return (
              <EmployeeCard {...author} />
            )
          })
        }
      </Stack>
    </K7Page>
  )
}