import React from 'react';
const RemoteButton=React.lazy( ()=> import('app2/Button'));
class App extends React.Component{
  render(){
    return(
  <div>
      <h1> Basic Host-Remote</h1>
      <h2> App1</h2> 
      <React.Suspense fallback="loading ..">
      <RemoteButton />
      </React.Suspense>
     
  </div>
);
    }
}

export default App;