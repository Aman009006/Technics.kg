import React ,{useState,useEffect} from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';
import Logo from '~/components/elements/common/Logo';
import axios from "axios"
import {config} from "~/config"

const MenuCategoriesDropdown = () => {
    const [category, setCategor] = useState();


    useEffect(() => {
        const headers = {
            "api-token": config.apiToken
        };

        axios
            .get(`${config.mainUrl}main/page`, {
                headers: headers,
            })
            .then((response) => {
                setCategor(response.data["hydra:member"][1].data.slice(0, 3));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function ShowAllMin (id){

      const headers = {
        "api-token": config.apiToken
    };

    axios
        .get(`${config.mainUrl}categories/by-parent?page=1&itemsPerPage=30&parent.id=${id}`, {
            headers: headers,
        })
        .then((response) => {
          setIsShownDoth(response.data["hydra:member"]);
          console.log(response.data["hydra:member"]);
        })
        .catch((error) => {
            console.log(error);
        });

    }


    const [isShownDoth, setIsShownDoth] = useState();
    const [open, setOpen ] = useState(false);


    return (
      <div className="category__dropdown">
        <button onClick={()=> setOpen(!open)} className='btn__ct_dn'>
          <img src='/images/three.svg'/>
        </button>
         <div className={open ? 'category__mini' : "none"}>
         <div className='container mauto'>
            <div className='categories_mini'>
           <div>
           {category?.map((c) => {
                 return (
                     <>
                     <a href="#" onClick={()=> ShowAllMin(c.id)} className="category__content_mini">
                         <p className='category__text_mini'>{c.name}</p>
                    </a>
                    </>
                );
            })}
           </div>

            <div className='mini__mini'>
            {isShownDoth?.map((c) => {
                console.log(c);
                 return (
                     <>
                     <a href={`/category/${c.slug}-${c.id}`} className="category__content_mini_m">
                        <p className=''>{c.name}</p>
                         {/* {c?.categories.map((cc)=>{
                            return(
                                <>
                                <p className='category__text_mini_m'>{cc.name}</p>
                                </>
                            )
                         })} */}
                    </a>
                    </>
                );
            })}
            </div>
            <button className='close__btn_mini' onClick={()=> setOpen(!open)}>X</button>
            </div>
         </div>
         </div>
      </div>
    );
  }
  // {`/category/${c.slug}-${c.id}`}

export default MenuCategoriesDropdown;
