import React, { Component } from 'react';

import './index.css';

const SizeChartData = [
  ["",         "XS",      "S",       "M",      "L",       "XL",      "2XL",     "3XL",   "4XL"], 
  ["Chest", "31 - 34", "34 - 37", "38 - 41", "42 - 45", "46 - 49", "50 - 53", "54 - 57", "58 - 61"],
  ["Length", "27",       "28",      "29",      "30",      "31",      "32",      "33",      "34" ]
];

class SizeChart extends Component {
  
  constructor(props) {
    
    super(props);

    this.state = { 
      show: false 
    };
    
    this.showSizeChart = this.showSizeChart.bind(this);
    this.hideSizeChart = this.hideSizeChart.bind(this);
  }

  showSizeChart(e) {
    
    e.preventDefault();
    this.setState({ show: true });
    
    return false;
  }

  hideSizeChart() {
    
    this.setState({ show: false });
  }

  render() {

    const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
    let sizeChartTitle = "Sizes (inches)";
    
    return (
      <React.Fragment>
        <div className={showHideClassName}>
          <section className="modal-main Bordered" role="dialog" aria-modal="true" aria-labelledby="SizeChartTitle">

            <button aria-label="Close Size Chart" className="CloseSizeChartButton" onClick={() => this.hideSizeChart()}>
              <span id="x">X</span>
            </button>
            
            <div className="table">
            
              <h2 id="SizeChartTitle">{sizeChartTitle}</h2>
            
              { 
                SizeChartData.map((column, colIndex) => {
                
                  return (
  
                    <div className="col" key={colIndex}>
                      {
                        column.map((row, rowIndex) => {
                          
                          let cellId = `col-${colIndex}-row-${rowIndex}`;
                          let ariaReference = `col-0-row-${rowIndex} col-${colIndex}-row-0`;
                          
                          return (
                              
                            <div id={cellId} key={cellId} aria-labelledby={ariaReference} className="cell">{row}</div>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
            
            </div>
            
          </section>
        </div>
        
        <div className="SizeChartLink">
          <a href="#" onClick={(e) => this.showSizeChart(e)}>Size Chart</a>
        </div>
      </React.Fragment>
    );
  }
}

export default SizeChart;
