exports.getIndex = async (req, res) => {
  res.render("map", { pageTitle: "Bristlecone Pines", path: "/map" });
};

exports.getBRCA = async (req, res) => {
  res.render("map/brca", {
    pageTitle: "Bryce Canyon Map",
    path: "/map/brca",
  });
};

exports.getGRBA = async (req, res) => {
  res.render("map/grba", {
    pageTitle: "Great Basin Map",
    path: "/map/grba",
  });
};
