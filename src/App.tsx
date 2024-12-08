//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'

//IMPORTAÇÃO DA IMAGEM DO WAFFLE
import waffle from './assets/imgs/waffle.png'
import cursor from './assets/imgs/cursor.png'
import heart from './assets/imgs/heart.png'

function App() {

  //UTILIZAÇÃO DO HOOK useState
  const [waffleClicked, setWaffleClicked] = useState<boolean>(false)
  const [waffles, setWaffles] = useState<number>(0)
  const [ritmo, setRitmo] = useState<number>(1)
  const [cursors, setCursors] = useState<number>(0)
  
  const cursorsPrices:number[] = [100, 200, 500, 1000, 2000, 2500]
  const ritmoPrices:number[] = [0, 100, 200, 400, 800, 1600, 3200]

  //FUNÇÃO RESPONSÁVEL POR GANHAR MAIS WAFFLES
  function getWaffles() { 
    //VERIFICA SE O USUÁRIO JÁ PEGOU O NÚMERO MÁXIMO DE WAFFLES
    if(Number(waffles + ritmo) >= 99999999999){
      //COLOCA O NÚMERO MÁXIMO DE WAFFLES SEM ULTRAPASSAR O LIMMITE
      setWaffles(99999999999)
      return
    }
    
    //VERIFICA SE O USUÁRIO ALCANÇOU O LIMITE DE WAFFLES
    if(waffles >= 99999999999){
      return
    }

    //AUMENTA EM UM A QUANTIDADE DE WAFFLES
    setWaffles(waffles + ritmo)
  }

  //FUNÇÃO RESPONSÁVEL POR MEXER O WAFFLE
  function moveWaffle() {
    //MUDA O ESTADO DO waffleClicked PARA false
    setWaffleClicked(false)

    //MUDA O ESTADO DO waffleClicked PARA true
    setWaffleClicked(true)
    
    //FUNÇÃO CHAMADA DEPOIS DE .5 SEGUNDOS
    setTimeout(() => {
      //MUDA O ESTADO DO waffleClicked PARA false
      setWaffleClicked(false)
    }, 300);
  }

  //FUNÇÃO RESPONÁVEL POR FORMATAR O NÚMERO
  function formatNumber(n:number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
  useEffect(() => {
    //FUNÇÃO RESPONSÁVEL POR PEGAR WAFFLES AUTOMATICAMENTE POR SEGUNDO
    const getWafflesPorSeconds = setInterval(() => {
      setWaffles(waffles => waffles + cursors);
      console.log(cursors)
    }, 1000);

    return () => clearInterval(getWafflesPorSeconds);
  }, [cursors])

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center text-2xl bg-my-quartenary`}
    >
      
      <div className={`fixed top-0 left-0 w-full pt-5 flex justify-center text-xl`}>
        <p className={`text-center absolute text-[28px] text-my-quintenary`}>Waffle Clicker</p>
        <p className={`text-center absolute text-[28px] text-my-terciary transform`}
        style={{ transform: "translate(5px, -5px)" }}>Waffle Clicker</p>
      </div>
      
      <div className={`fixed top-0 left-0 w-full pt-32 flex justify-center text-xl`}>
        <p className={`text-center absolute text-[32px] text-my-quintenary`}>{formatNumber(waffles)}</p>
        <p className={`text-center absolute text-[32px] text-my-primary transform`}
        style={{ transform: "translate(5px, -5px)" }}>{formatNumber(waffles)}</p>
      </div>

      <img
        src={waffle}
        alt="Imagem do Waffle"
        onClick={() => {
          getWaffles()
          moveWaffle()
        }}
        className={`${waffleClicked == true ? 'animate-shake' : ''}`}
        id='waffle'
      />


      <div className={`w-full absolute bottom-0 left-0 flex flex-col items-start justify-center `}>
        <div className={`w-full flex justify-end items-center`}>
          
          <div className={`m-2 flex flex-col items-center justify-center`}>
            <img
              src={cursor}
              className={`h-[36px] w-auto`}
            />
            <p className={`text-my-quintenary`}>{ritmo - 1}x</p>
          </div>

          <div className={`m-2 flex flex-col items-center justify-center`}>
            <img
              src={heart}
              className={`w-12 h-auto`}
            />
            <p className={`text-my-quintenary`}>{cursors}x</p>
          </div>
          
        </div>

        <div className={`w-full flex items-center justify-between p-6 bg-my-primary`}>

          <div className={`flex flex-col items-center justify-start `}>
            <img
              src={heart}
              alt=""
              onClick={() => {
                console.log(waffles)
                if(waffles < cursorsPrices[cursors]){
                  return
                }else{
                  if(cursors > Number(cursorsPrices.length - 1)){
                    return
                  }else{
                    setCursors(cursors + 1)
                    setWaffles(waffles - cursorsPrices[cursors])
                  }
                }
              }}
              className={`w-20 h-auto`}
            />
            <p className={`pl-3 mt-3 text-my-quintenary uppercase
              ${cursors > cursorsPrices.length - 1 && 'line-through text-[#ff3131]'}
              ${waffles < cursorsPrices[cursors] ? 'text-[#ff0000]' : ''}
            `}>
              {cursors > cursorsPrices.length - 1 ? 'sold' : cursorsPrices[cursors]}
            </p>
          </div>
          
          <div className={`flex flex-col items-center justify-start `}>
            <img
              src={cursor}
              alt=""
              onClick={() => {
                console.log(waffles)
                if(waffles < ritmoPrices[ritmo]){
                  return
                }else{
                  if(ritmo > Number(ritmoPrices.length - 1)){
                    return
                  }else{
                    setRitmo(ritmo + 1)
                    setWaffles(waffles - ritmoPrices[ritmo])
                  }
                }
              }}
              className={`h-[66px] w-auto`}
            />
            <p className={`pl-3 mt-3 text-my-quintenary uppercase
              ${ritmo > ritmoPrices.length - 1 && 'line-through text-[#ff3131]'}
              ${waffles < ritmoPrices[ritmo] ? 'text-[#ff0000]' : ''}
            `}>
              {ritmo > ritmoPrices.length - 1 ? 'sold' : ritmoPrices[ritmo]}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
