import I18n from 'i18n-js';
import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {SeperatorFromTopOrBottom} from '../../../components/shared-styled.components';
import HomeCampaignRow from './home-campaign-row.component';

const SupWrapper = styled(View)`
  width: 100%;
`;

const CampaignCoverView = styled(View)`
  flex-direction: row;

  width: 100%;
  padding: ${props => props.theme.space[2]};

  padding-bottom: ${props => props.theme.space[1]};
  padding-top: ${props => props.theme.space[1]};
`;
const Label = styled(Text)`
  color: ${props => props.theme.color.tertiary};
  font-size: ${props => props.theme.text.h2};
  padding-left: ${props => props.theme.space[3]};
  font-weight: bold;
`;
const HomeCampaigns = ({
  organizedCampaigns,
  oneCmpImageWidth,
  oneCmpImageHeight,
  goToProductList,
}) => {
  return (
    <SupWrapper>
      {organizedCampaigns.length > 0 && (
        <Label
          style={{
            textShadowColor: 'gray',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 2,
          }}>
          {/* {I18n.t("$AnaSayfaMarkalar")} */}
          {I18n.t('$AnaSayfaKampanyaliUrunler')}
        </Label>
      )}
      <SeperatorFromTopOrBottom />

      {organizedCampaigns.map((campaigns, index) => {
        return (
          <CampaignCoverView key={`${index}._|.${index}`}>
            {campaigns.map((_item, _index) => {
              return (
                <HomeCampaignRow
                  key={`${index}.-${_index}`}
                  item={_item}
                  index={_item.campaignID}
                  oneCmpImageWidth={oneCmpImageWidth}
                  oneCmpImageHeight={oneCmpImageHeight}
                  goToProductList={goToProductList}
                />
              );
            })}
          </CampaignCoverView>
        );
      })}
    </SupWrapper>
  );
};

export default React.memo(HomeCampaigns);
