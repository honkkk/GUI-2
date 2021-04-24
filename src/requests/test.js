import EventCard from "../event/event-card.js"
import EventBar from "../event/event-bar.js"
import RequestBar from "./requestBar.js"
import { useCookies, CookiesProvider } from 'react-cookie';

const TestPage = ({requestData, handlers, sentRequests}) => {

  return (
    <div>
      <h1>Requests</h1>
      <h2>Join requests</h2>
      {
        requestData ?
        requestData.length == 0 ?
          <p>You have no requests to respond to.</p>
        :
        requestData.map((request, index) => (<RequestBar key={request.user} user = {request.user} event = {request.event} request = {request.request} onRequestChange={handlers.join} getSession={handlers.session}/>))
        : <p>loading...</p>
      }
      <h2>Sent requests</h2>
      {
        sentRequests ?
        sentRequests.length == 0 ?
          <p>You have no pending requests.</p>
        :
        sentRequests.map((request, index) => (<RequestBar key={request.event} ky={index} isSent={true} event={request.event} onCancel={handlers.cancel} request={request.request}/>))
        : <p>loading...</p>
      }
    </div>
  )
}

export default TestPage
