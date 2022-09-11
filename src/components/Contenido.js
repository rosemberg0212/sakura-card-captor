import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import styles from './contenido.module.css'

const Contenido = (props) => {
    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    var itemsPerPage = 5;

    const params = useParams()

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    

    const carta = data.find(d => d._id === params.id)


    return (
        <>
            {carta ? (<div className={styles.cartaPrincipal}>
                <div className={styles.conte}>
                    <div className={styles.img}>
                        <img src={carta?.sakuraCard} alt='carta' />
                    </div>
                </div>
                <div className={styles.info}>
                    <p>Nombre en Español: <span>{carta?.spanishName}</span></p>
                    <p>Nombre en Ingles: <span>{carta?.englishName}</span></p>
                    <p>Numéro de la carta: <span>{carta?.cardNumber}</span></p>
                    <p>Kanji: <span>{carta?.kanji}</span></p>
                    <p>Significado: <span>{carta?.meaning}</span></p>
                </div>
            </div>) : (
                <div className={styles.cartaPrincipal}>
                    <div className={styles.conte}>
                        <div className={styles.img}>
                            <img src={data[0]?.sakuraCard} alt='data' />
                        </div>
                    </div>
                    <div className={styles.info}>
                        <p>Nombre en Español: <span>{data[0]?.spanishName}</span></p>
                        <p>Nombre en Ingles: <span>{data[0]?.englishName}</span></p>
                        <p>Numéro de la carta: <span>{data[0]?.cardNumber}</span></p>
                        <p>Kanji: <span>{data[0]?.kanji}</span></p>
                        <p>Significado: <span>{data[0]?.meaning}</span></p>
                    </div>
                </div>
            )
            }

            <div className={styles.flex}>
                {currentItems.map((item) => (
                    <div className={styles.cartas} key={item._id}>
                        <Link to={`/${item._id}`}>
                            <img src={item.clowCard} alt='card' className={styles.sakuraCard} />
                        </Link>
                    </div>
                ))}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={styles.pagination}
                pageLinkClassName={styles.pageNum}
                previousLinkClassName={styles.pageNumF}
                nextLinkClassName={styles.pageNumF}
                activeLinkClassName={styles.active}
            />
        </>
    )
}

export default Contenido