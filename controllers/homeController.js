exports.getIndex = async (req, res) => {
  res.render("home", { pageTitle: "Bristlecone Pines", path: "/" });
};

exports.getAbout = async (req, res) => {
  res.render("home/about", { pageTitle: "About", path: "/about" });
};
