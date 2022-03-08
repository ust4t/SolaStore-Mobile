import React from 'react';
import BaseScreen from '../../../shared/base.screen';
import {inject, observer} from 'mobx-react';

@inject('BusyStore', 'UserStore')
@observer
class StoryItems extends BaseScreen {
  constructor(props) {
    super(props);
  }

  render() {
    return <></>;
  }
}

export default StoryItems;
