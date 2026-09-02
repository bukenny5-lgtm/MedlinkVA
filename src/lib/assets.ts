export const clientAssets = {
  logo: new URL("../assets/optimized/logo/medlink-va-logo.png", import.meta.url).href,
  hero: new URL("../assets/optimized/photos/medlink-va-hero.jpg", import.meta.url).href,
  supportPhoto: new URL("../assets/optimized/photos/medlink-va-individual-assistant.jpg", import.meta.url).href,
  teamPhoto: new URL("../assets/optimized/photos/medlink-va-team.jpg", import.meta.url).href,
  ceoPhoto: new URL("../assets/optimized/team/ceo.jpg", import.meta.url).href,
  trainingAssistantOnePhoto: new URL(
    "../assets/optimized/team/training-assistant-01.jpg",
    import.meta.url,
  ).href,
  trainingAssistantTwoPhoto: new URL(
    "../assets/optimized/team/training-assistant-02.jpg",
    import.meta.url,
  ).href,
  virtualAdministrativeAssistantPhoto: new URL(
    "../assets/optimized/team/virtual-administrative-assistant.jpg",
    import.meta.url,
  ).href,
} as const;

