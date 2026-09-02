import React from 'react';

export class AppErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state={hasError:false,error:null};
  }

  static getDerivedStateFromError(error){
    return {hasError:true,error};
  }

  componentDidCatch(error,info){
    if(typeof console!=='undefined')console.error('Learning Hub render error:',error,info);
  }

  reset=()=>{
    this.setState({hasError:false,error:null});
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };

  render(){
    if(!this.state.hasError)return this.props.children;
    return <main className="page" role="alert">
      <header className="page-header">
        <div className="badge">कक्षा 9 • सुरक्षित पुनर्प्राप्ति</div>
        <h1>यह पेज सही तरह से खुल नहीं पाया</h1>
        <p>एक अप्रत्याशित UI त्रुटि हुई। नीचे दिए बटन से इस स्क्रीन को सुरक्षित रूप से रीसेट करें।</p>
      </header>
      <section className="page-content">
        <div className="science-complete">
          <button type="button" className="primary-btn pressable" onClick={this.reset}>फिर से खोलें ↻</button>
          <p style={{marginTop:12}}>आपकी पढ़ाई की प्रगति स्थानीय रूप से सेव रहती है; इस recovery screen का उद्देश्य खाली सफेद पेज से बचाना है।</p>
        </div>
      </section>
    </main>;
  }
}

export default AppErrorBoundary;
