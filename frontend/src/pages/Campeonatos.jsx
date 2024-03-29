import * as React from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import axios from 'axios';
import csgoLogo from "../images/csgo.webp";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}
var campeonatos = [];

function preencheCampeonatos(campeonato) {
  if (campeonato.local === "South America" || campeonato.local === "Brazil") {
    campeonatos.push(campeonato);
  }
  console.log(campeonato);
}

export default function Campeonatos() {
  const [campeonatosLiquipedia, setcampeonatosLiquipedia] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("https://team-manager-csgo.vercel.app/api/liquipedia");
      setcampeonatosLiquipedia(response.data);
    }
    console.log("use effect");
    getData();
  }, []);

  campeonatosLiquipedia.forEach(preencheCampeonatos);
  return (
    <div>
      <Typography level="h1">Campeonatos</Typography>
      <Box
        component="ul"
        sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 0, m: 0 }}
      >
        {campeonatos.map((campeonato) => (
          <Card
            variant="outlined"
            row
            sx={{
              minWidth: "320px",
              maxWidth: "320px",
              gap: 2,
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
            }}
          >
            <AspectRatio ratio="1" sx={{ width: 120 }}>
              <img src={csgoLogo} alt="" />
            </AspectRatio>
            <Box>
              <Box sx={{ ml: 0.5 }}>
                <Typography
                  level="h2"
                  fontSize="lg"
                  id="card-description"
                  mb={0.5}
                >
                  {campeonato.titulo}
                </Typography>
                <Typography
                  fontSize="sm"
                  aria-describedby="card-description"
                  mb={1}
                >
                  <Link
                    overlay
                    underline="none"
                    href="#interactive-card"
                    sx={{ color: "text.tertiary" }}
                  >
                    {campeonato.local}
                  </Link>
                </Typography>
                <Chip
                  variant="outlined"
                  color="primary"
                  size="sm"
                  sx={{ pointerEvents: "none" }}
                >
                  Liquipedia
                </Chip>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
}
