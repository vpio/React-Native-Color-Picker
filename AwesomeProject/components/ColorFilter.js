import React, {Component} from 'react';
import { Title, NavigationBar, DropDownMenu, Screen, Text } from '@shoutem/ui';

class ColorFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filters: [
        {
          filterStyle: "List View",
          models:
            {
              model: "Audi R8",

            }
        },
        {
          filterStyle: "Squares",
          models: {
            model: "Chiron",
            image: {
              url: "https://shoutem.github.io/img/ui-toolkit/dropdownmenu/Chiron.jpg"
            },
            description: "Bugatti premiered the Bugatti "
              + "Chiron as a successor to the Veyron."
          }
        }
      ],
    }
  }

  render() {
    const selectedFilter = this.state.selectedFilter || this.state.filters[0];

    return (
      <Screen>
        <DropDownMenu
          styleName="horizontal"
          options={this.state.filters}
          selectedOption={selectedFilter ? selectedFilter : this.state.filters[0]}
          onOptionSelected={(car) => {
            console.log('option selected')
            this.props.changeView(car)
            this.setState({ selectedFilter: car })
          }}
          titleProperty="filterStyle"
          valueProperty="filters.model"
        />
      </Screen>
    )
  }
}

export default ColorFilter;
