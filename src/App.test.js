import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import { setupServer } from 'msw/node'
import { rest } from 'msw';

const MyTestGroup= { 
  mockCall: ()=>{
rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        console.log("THIS IS CALLED");
      return res(
          ctx.json(
                 { results:[{name:{
                      first: "Nagaraja",
                      last: "CH" 
                  }}]
                }
              
              )
      );
  })
}
}
const server = setupServer(
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    console.log("THIS IS CALLED");
  return res(
      ctx.json(
             { results:[{name:{
                  first: "Nagaraja",
                  last: "CH" 
              }}]
            }
          
          )
  );
})
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('Firstname and Last name is initialized and loaded properly', async () => {
      render(<App/>)
  
      let result = await screen.findByTestId("fullname")
      expect(result).toHaveTextContent("Nagaraja")

});

test('Change in text box changes h2 content',async () =>{
  render(<App/>)
  const element= await screen.findByLabelText(/first/i)
  fireEvent.change(element, { target: { value: 'peter' } })
  const testElement=screen.getByTestId("fullname");
  expect(testElement).toHaveTextContent("peter");
});
   