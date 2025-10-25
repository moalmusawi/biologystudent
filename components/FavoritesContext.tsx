
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface FavoriteItem {
  titleKey: string;
  link: string;
  unitTitleKey: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (link: string) => void;
  isFavorite: (link: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('biology-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      localStorage.removeItem('biology-favorites');
    }
  }, []);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, item];
      localStorage.setItem('biology-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorite = (link: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((fav) => fav.link !== link);
      localStorage.setItem('biology-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (link: string) => {
    return favorites.some((fav) => fav.link === link);
  };

  const value = { favorites, addFavorite, removeFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
