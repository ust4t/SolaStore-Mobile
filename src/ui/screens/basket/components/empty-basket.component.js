import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import EmptyBasketHeader from './empty-basket-favorite-header.component';
import EmptyBasketFavoriteRow from './empty-basket-favorite-row.component';


const EmptyBasketFavoritesFlatList = styled(FlatList)`
    flex:1;

`
const EmptyBasket = ({
    favoritesList,goBack,addToBasket
}) => (
    <EmptyBasketFavoritesFlatList
        data={favoritesList}
        renderItem={({item, index}) => <EmptyBasketFavoriteRow item={item} index={index} addToBasket={addToBasket} />}
        ListHeaderComponent={<EmptyBasketHeader goBack={goBack} />}

    />
);

export default React.memo(EmptyBasket);
