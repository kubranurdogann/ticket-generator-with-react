import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const { email, name, githubUsername, file } = location.state || {};
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();


  function generateTicketNumber() {
    const ticketNo = Math.floor(100000 + Math.random() * 900000);
    return ticketNo;
  }

  return (
    <div>
        <h1 className="mt-5 fw-bold">Congrats, <span className="red-gradient">{name}!</span><br></br>
        your ticket is ready.</h1>
        <h5 className="fw-light mt-4 text-gray" >We've emailed your ticket to
        <br></br><span className="red-gradient">{email}</span> and will send updates in<br></br>
        the run up to the event.
        </h5>  

        <div className="ticket-area">
            <div className="ticket-svg">
                <div className="ticket-header">
                    <img src="./src/assets/images/logo-full.svg" alt=""/>
                    <h5 className="ticket-date">{month} {day}, {year} / Ankara,TR</h5>
                </div>
                <div className="ticket-owner">
                    <div className="upload-img mb-3">
                    <img src={URL.createObjectURL(file)} alt="Uploaded File" width="75" />
                    </div>
                    <div className="user-name">
                        <h3>{name}</h3>
                        <span><img src="./src/assets/images/icon-github.svg" alt=""/> {githubUsername}</span>
                    </div>
                </div>
                <div className="ticket-no">
                    <span>#{generateTicketNumber()}</span>
                </div>
            </div>
            
        </div>
      
    </div>
  );
}

export default Home;
