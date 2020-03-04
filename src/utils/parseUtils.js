export const parseCategory = category => {
  return {
    id: category.id,
    name: category.get("name"),
    imageSrc: category.get("imageSrc"),
    cheapestItem: category.get("cheapestItem"),
    handle: category.get("categoryHandle"),
    productCount: category.get("productsCount")
  };
};

export const parseSettings = settings => {
  return {
    updateMessage: settings.get("updateMessage"),
    appLatestVersion: settings.get("appLatestVersion"),
    gdprVersion: settings.get("gdprVersion"),
    maintenanceMode: settings.get("maintenanceMode"),
    justReleasedNew: settings.get("justReleasedNew"),
    adGateCpi: settings.get("adGateCpi"),
    installsOn: settings.get("installsOn"),
    adscendOn: settings.get("adscendOn"),
    theOremOn: settings.get("theOremOn"),
    pollfishOn: settings.get("pollfishOn")
  };
};
