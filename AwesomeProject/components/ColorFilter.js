import React, {Component} from 'react';
import { Title, NavigationBar, DropDownMenu, Screen, Text } from '@shoutem/ui';

class ColorFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filters: [
        {
          brand: "List View",
          models:
            {
              model: "Audi R8",

            }
        },
        {
          brand: "Squares",
          models: {
            model: "Chiron",
            image: {
              url: "https://shoutem.github.io/img/ui-toolkit/dropdownmenu/Chiron.jpg"
            },
            description: "Bugatti premiered the Bugatti "
              + "Chiron as a successor to the Veyron."
          }
        },
        {
          brand: "Palette",
          models: {
            model: "Dodge Viper",
            image: {
              url: "https://shoutem.github.io/img/ui-toolkit/dropdownmenu/Dodge-Viper.jpg"
            },
            description: "The Dodge Viper is a super car "
              + "manufactured by Dodge (SRT for 2013 and 2014)."
          }
        },
      ],
    }
  }

  render() {
    const selectedFilter = this.state.selectedFilter || this.state.filters[0];

    return (
      <Screen>
        <NavigationBar
          title="Views"
          styleName="inline"
        />
        <DropDownMenu
          styleName="horizontal"
          options={this.state.filters}
          selectedOption={selectedFilter ? selectedFilter : this.state.filters[0]}
          onOptionSelected={(car) => this.setState({ selectedFilter: car })}
          titleProperty="brand"
          valueProperty="filters.model"
        />
      </Screen>
    )
  }
}

export default ColorFilter;
