exports.getIndex = async (req, res) => {
  res.render("home", { pageTitle: "Bristlecone Pines", path: "/" });
};
