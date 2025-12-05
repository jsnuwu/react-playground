import jsnAvatar from "../assets/profilePictures/jsn.jpg";
import davidAvatar from "../assets/profilePictures/gloriezzz.png";
import jennyAvatar from "../assets/profilePictures/mondBogen.png";
import DennisAvatar from "../assets/profilePictures/dennis.png";
import felixPAvatar from "../assets/profilePictures/felix.jpg";
import MechuAvatar from "../assets/profilePictures/mechu.png";
import felixSAvatar from "../assets/profilePictures/felixS.png";
import NilsAvatar from "../assets/profilePictures/nils.png";
import AdrianAvatar from "../assets/profilePictures/adi.png";
import KristofAvatar from "../assets/profilePictures/kristof.png";
import MoAvatar from "../assets/profilePictures/mo.png";
/*
const players = [
  { id: 1, name: "Jason", avatar: jsnAvatar },
  { id: 2, name: "David", avatar: davidAvatar },
  { id: 3, name: "Jenny", avatar: jennyAvatar },
  { id: 4, name: "Dennis", avatar: DennisAvatar },
  { id: 5, name: "Felix P", avatar: felixPAvatar },
  { id: 6, name: "Mechu", avatar: MechuAvatar },
  { id: 7, name: "Felix S", avatar: felixSAvatar },
  { id: 8, name: "Mohammed", avatar: MoAvatar },
  { id: 9, name: "Nils", avatar: NilsAvatar },
  { id: 10, name: "Adrian", avatar: AdrianAvatar },
  { id: 11, name: "Kristof", avatar: KristofAvatar },
];

 HIER ID anpassen weil avatare falsch ;-; (wenn backend an ist)

*/


const players = [
  {
    id: 1,
    name: "Jason",
    avatar: jsnAvatar,
    kills: 81,
    deaths: 52,
    assists: 48,
    wins: 4,
    looses: 5,
    winRate: ((4 / (4 + 5)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/jsnuwu-69420",
    roundsPlayed: 9,
  },
  {
    id: 2,
    name: "David",
    avatar: davidAvatar,
    kills: 78,
    deaths: 35,
    assists: 69,
    wins: 7,
    looses: 2,
    winRate: ((7 / (7 + 2)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/gloriezzz-EUW",
    roundsPlayed: 9,
  },
  {
    id: 3,
    name: "Jenny",
    avatar: jennyAvatar,
    kills: 30,
    deaths: 49,
    assists: 101,
    wins: 4,
    looses: 5,
    winRate: ((4 / (4 + 5)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/M00NB0W-EUW",
    roundsPlayed: 9,
  },
  {
    id: 4,
    name: "Dennis",
    avatar: DennisAvatar,
    kills: 64,
    deaths: 34,
    assists: 57,
    wins: 6,
    looses: 3,
    winRate: ((6 / (6 + 3)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/Dhuscarr-2211",
    roundsPlayed: 9,
  },
  {
    id: 5,
    name: "Felix P",
    avatar: felixPAvatar,
    kills: 67,
    deaths: 60,
    assists: 56,
    wins: 4,
    looses: 5,
    winRate: ((4 / (4 + 5)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/2Luckyy-EUW",
    roundsPlayed: 9,
  },
  {
    id: 6,
    name: "Mechu",
    avatar: MechuAvatar,
    kills: 4,
    deaths: 36,
    assists: 18,
    wins: 2,
    looses: 7,
    winRate: ((2 / (2 + 7)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/Chuchiii-EUW",
    roundsPlayed: 9,
  },
  {
    id: 7,
    name: "Felix S",
    avatar: felixSAvatar,
    kills: 12,
    deaths: 54,
    assists: 48,
    wins: 3,
    looses: 6,
    winRate: ((3 / (3 + 6)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/ZeFX6-1173",
    roundsPlayed: 9,
  },
  {
    id: 8,
    name: "Mohammed",
    avatar: MoAvatar,
    kills: 42,
    deaths: 42,
    assists: 53,
    wins: 3,
    looses: 6,
    winRate: ((3 / (3 + 6)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/Killua%E3%83%84-SNIP1",
    roundsPlayed: 9,
  },
  {
    id: 9,
    name: "Nils",
    avatar: NilsAvatar,
    kills: 38,
    deaths: 55,
    assists: 40,
    wins: 2,
    looses: 7,
    winRate: ((2 / (2 + 7)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/Nols1000-0079",
    roundsPlayed: 9,
  },
  {
    id: 10,
    name: "Adrian",
    avatar: AdrianAvatar,
    kills: 14,
    deaths: 26,
    assists: 7,
    wins: 5,
    looses: 4,
    winRate: ((5 / (5 + 4)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/euw/SuperAdi06-EUW",
    roundsPlayed: 9,
  },
  {
    id: 11,
    name: "Kristof",
    avatar: KristofAvatar,
    kills: 29,
    deaths: 19,
    assists: 7,
    wins: 3,
    looses: 2,
    winRate: ((3 / (3 + 2)) * 100).toFixed(1),
    profileLink: "https://op.gg/lol/summoners/eune/FreeSummer-3225",
    roundsPlayed: 5,
  },
];

export default players;
