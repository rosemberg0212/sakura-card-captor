import React, { useEffect, useState } from 'react'
import Contenido from './Contenido';
import styles from './contenido.module.css'

const Card = () => {
    const [data, setcartas] = useState([]);

    const getCard = async () => {
        const res = await fetch('https://protected-taiga-89091.herokuapp.com/api/card')
        const data = await res.json()
        setcartas(data.data)
        console.log(data.data)
    }

    useEffect(() => {
        getCard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.card}>
            <Contenido
                data={data}
            />
        </div>
    )
}

export default Card