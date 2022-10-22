import Table from '../components/Table'
import Header from "../components/Header"
import LotteryCard from "../components/LotteryCard"
import style from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={style.wrapper}>
      {/* TODO: Header */}
      <Header/>
      {/* TODO: LotteryCard */}
      <LotteryCard/>
      {/* TODO: Players Table */}
    </div>
  )
}
