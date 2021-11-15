import React, {Component} from 'react';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kediSıra: Math.floor(Math.random()*3),
            durum: undefined,
            kart: ["img/ArkaKapak.png","img/ArkaKapak.png","img/ArkaKapak.png"],
            sayac: 0,
              oyunBitti: false
        }
    }


    kediSec = (index) => {
        const { kart, kediSıra, sayac, oyunBitti } = this.state;

        if(!oyunBitti){
            const yeniKart = [...kart];
            let durum;

            if(kediSıra===index){
                yeniKart[index] = "img/Kedi.jpg";
                durum = "Kazandınız!"
            }else {
                yeniKart[index] = "img/Kopek.jpg";
                if(sayac===1){
                    durum = "Kaybettiniz..."
                }
            }
            this.setState({
                kart:yeniKart,
                sayac: this.state.sayac+1,
                durum
            });

            if(durum){
                this.setState({
                    oyunBitti: true
                })
            }

        }
    }

    yeniOyun = () => {
        this.setState({
            kediSıra: Math.floor(Math.random()*3),
            durum: undefined,
            kart: ["img/ArkaKapak.png","img/ArkaKapak.png","img/ArkaKapak.png"],
            sayac: 0,
            oyunBitti: false
        })
    }

    render(){
        const { kart, durum } = this.state;
        return (
            <div>
                <p>Bu oyunda 3 kapalı kart içindeki kediyi bulman gerekmektedir. İlk tercihte Kedi kartını bulamaz isen
                    2. seçim hakkı tanınacaktır.</p>
                <img className="kart" src={kart[0]} onClick={()=>{this.kediSec(0)}}/>
                <img className="kart" src={kart[1]} onClick={()=>{this.kediSec(1)}}/>
                <img className="kart" src={kart[2]} onClick={()=>{this.kediSec(2)}}/>
                <div className="mesaj">
                    <p>{durum?durum:"Kedi kartını bulmak için kartın üzerine tıklamalısın."}</p>
                    {durum && <p>
                        Yeniden oynamak için <span onClick={this.yeniOyun} className='link'>buraya</span> tıklayabilirsin.
                    </p>}
                </div>
            </div>
        );
    }
}

