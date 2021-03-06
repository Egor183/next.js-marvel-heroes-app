import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { selectLoaderState } from "redux/selectors/loader.selectors";
import { selectSearchState } from "redux/selectors/search.selectors";
import { IMAGE_RESOLUTIONS } from "constants/avatar.constants";
import { useMarvelHeroes } from "hooks/useMarvelHeroes";
import { useHandleScroll } from "hooks/useHandleScroll.hook";
import { MarvelHeroRenderItemType } from "types/marvel-heroes.types";
import MainLayout from "components/MainLayout";
import Loader from "components/Loader";
import Search from "components/Search";
import { createSrc } from "helpers/avatar.helpers";
import Hero from "../Hero";

import styles from "./styles.module.css";

const Home = () => {
  const { marvelHeroes, getMarvelHeroes, heroId } = useMarvelHeroes();
  const isLoading = useSelector(selectLoaderState);
  const { results } = useSelector(selectSearchState);
  const { scrollRef, handleScroll, scrollElementRef } = useHandleScroll(
    getMarvelHeroes,
    results
  );

  return (
    <MainLayout
      title="Marvel heroes"
      HeaderComponent={<Search source={marvelHeroes} filterField="name" />}
    >
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={styles.contentContainer}
        >
          {results.length ? (
            results.map((item: MarvelHeroRenderItemType) => (
              <div
                ref={item.id === heroId ? scrollElementRef : null}
                key={item.id}
              >
                <Link passHref href={`/${item.id}`} key={item.id}>
                  <a>
                    <Hero
                      name={item.name}
                      description={item.description}
                      src={createSrc(
                        item.thumbnail,
                        IMAGE_RESOLUTIONS.STANDARD_LARGE
                      )}
                      id={item.id}
                    />
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p className={styles.noHero}>looks like there are no heroes...</p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
