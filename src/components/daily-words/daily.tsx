import "./daily.css";

type tip = { title: string }

export default function Daily() {

    const conTip: tip[] = [
        { title: "After each income, immediately put aside at least 10% in investments or savings. Don't spend - invest in your future self." },
        { title: "Keep track of your income and expenses. Even the richest people track where every ruble (or sum) goes. Without tracking, there is no control." },
        { title: "Earn money not only with your body (work), but also with your mind - invest in skills, businesses, stocks, real estate." },
        { title: "Financial freedom comes to those who spend wisely, not just those who earn a lot." },
        { title: "Читайте книги инвесторов (Кийосаки, Баффет), слушай подкасты, смотри видео — окружай себя деньгами даже через контент." }
    ];

    return (
        <div className="financial-tips">
            <div className="tip-content">
                <div className="tip-title">
                    💡 <span>Daily Tie</span>
                </div>
                {conTip[Math.floor(Math.random() * conTip.length)].title}
            </div>
        </div>
    )
}