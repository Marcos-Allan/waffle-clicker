//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'

//IMPORTAÇÃO DAS IMAGEMS
import waffle from './assets/imgs/waffle.png'
import cursor from './assets/imgs/cursor.png'
import heart from './assets/imgs/heart.png'
import google from './assets/imgs/google-logo.png'
import bg from './assets/imgs/wood.jpg'
import plate from './assets/imgs/plate.png'

//IMPORTAÇÃO DOS SERVIÇOS DO FIREBASE
import { auth, provider, signInWithPopup } from './utils/firebase.ts'

function App() {

  //UTILIZAÇÃO DO HOOK useState
  const [googleLogged, setGoogleLogged] = useState<boolean>(false)
  const [waffleClicked, setWaffleClicked] = useState<boolean>(false)
  const [waffles, setWaffles] = useState<number>(0)
  const [ritmo, setRitmo] = useState<number>(1)
  const [cursors, setCursors] = useState<number>(0)
  
  const cursorsPrices:number[] = [100, 200, 400, 600, 800, 1000, 1500, 2000, 2500, 3000]
  const ritmoPrices:number[] = [0, 100, 200, 400, 600, 800, 100, 1200, 1600, 2000, 3000]

  //FUNÇÃO RESPONSÁVEL POR FAZZER LOGIN COM O GOOGLE
  const handleGoogleLogin = async () => {
    try {
      //REALIZA O LOGIN VIA POPUP DO GOOGLE
      const result = await signInWithPopup(auth, provider);

      //PERMITI O USUÁRIO PODER JOGAR O JOGO
      setGoogleLogged(result.user ? true : false)

    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  };

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
    }, 1000);

    return () => clearInterval(getWafflesPorSeconds);
  }, [cursors])

  return (
    <div
      style={{ backgroundImage: `url('${bg}')` }}
      className={`
        w-[100dvw] h-[100dvh] flex flex-col justify-center items-center text-2xl bg-my-quartenary bg-contain bg-left
      `}
    >
      <div className={`fixed top-0 left-0 w-full pt-5 flex justify-center text-xl`}>
        <p className={`text-center absolute text-[28px] text-my-quintenary`}>Waffle Clicker</p>
        <p className={`text-center absolute text-[28px] text-my-secondary transform`}
        style={{ transform: "translate(5px, -5px)" }}>Waffle Clicker</p>
      </div>
      {googleLogged == true ? (
      <>
          
          <div className={`fixed top-0 left-0 w-full pt-32 flex justify-center text-xl z-[5]`}>
            <p className={`text-center absolute text-[32px] text-my-quintenary`}>{formatNumber(waffles)}</p>
            <p className={`text-center absolute text-[32px] text-my-primary transform`}
            style={{ transform: "translate(5px, -5px)" }}>{formatNumber(waffles)}</p>
          </div>

          <img
            src={plate}
            alt="Imagem e Prato"
            className={`pb-[100px] fixed z-[1] min-w-[650px] pe-[30px]`}
          />

          <img
            src={waffle}
            alt="Imagem do Waffle"
            onClick={() => {
              getWaffles()
              moveWaffle()
            }}
            className={`pb-[100px] z-[3] ${waffleClicked == true ? 'animate-shake' : ''}`}
            id='waffle'
          />


          <div className={`w-full fixed bottom-0 left-0 flex flex-col items-start justify-center `}>
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

            <div className={`w-full flex items-center justify-between p-6 bg-[#00000067]`}>

              <div className={`flex flex-col items-center justify-start `}>
                <img
                  src={heart}
                  alt=""
                  onClick={() => {
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
                <p className={`pl-3 mt-3 uppercase
                  ${waffles < cursorsPrices[cursors] || cursors > cursorsPrices.length - 1 ? 'text-my-red' : 'text-my-quintenary'}
                  ${cursors > cursorsPrices.length - 1 && 'line-through text-my-red'}
                `}>
                  {cursors > cursorsPrices.length - 1 ? 'sold' : cursorsPrices[cursors]}
                </p>
              </div>
              
              <div className={`flex flex-col items-center justify-start `}>
                <img
                  src={cursor}
                  alt=""
                  onClick={() => {
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
                <p className={`pl-3 mt-3 uppercase
                  ${waffles < ritmoPrices[ritmo] || ritmo > ritmoPrices.length - 1 ? 'text-my-red' : 'text-my-quintenary'}
                  ${ritmo > ritmoPrices.length - 1 && 'line-through text-my-red'}
                `}>
                  {ritmo > ritmoPrices.length - 1 ? 'sold' : ritmoPrices[ritmo]}
                </p>
              </div>
            </div>
          </div>
        </>
      ):(
        <>
          <div
              onClick={() => {
                  //FAZ LOGIN COM REDIRECIONAMENTO PARA OUTRA PÁGINA
                  handleGoogleLogin()
              }}
              className={`bg-[#ffffffac] rounded-[10px] flex items-center justify-center pe-[80px] capitalize border-[4px] border-my-terciary`}
            >
              <img src={google} alt="" className={`w-[175px]`} />
              <p>login</p>
          </div>
        </>
      )} 
    </div>
  )
}

export default App
