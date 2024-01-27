import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container"
import React from "react";
import "./Pagination.scss"

export const Custom_Pagination = ({ pages, curent_page , handlerPages }) => {
  const elementos = [];
  for (let i = 0; i < pages; i++) {
    elementos.push(i);
  }

  return (
    <Container fluid className="d-flex justify-content-center container_pagination">
      <Pagination>
        <Pagination.First  onClick={()=>handlerPages("first_page")}/>
        <Pagination.Prev  onClick={()=>handlerPages("prev")}/>

        {elementos.map((res, index) => {
          res = res + 1;
          return (
            <React.Fragment key={index}>
              {res === curent_page && (
                  <>
                  {res !== 1 && res > 2 && 
                  <>
                  <Pagination.Item onClick={()=>handlerPages("first_page")}>1</Pagination.Item> 
                  <Pagination.Ellipsis />
                  </>
                  }
                  {res > 1 && <Pagination.Item onClick={()=>handlerPages(res-1)}>{res - 1}</Pagination.Item>}
                  <Pagination.Item active onClick={()=>handlerPages(res)}>{res}</Pagination.Item>
                  {res < pages && <Pagination.Item onClick={()=>handlerPages(res+1)}>{res + 1}</Pagination.Item>}
                  {res !== pages && res < pages - 2 && 
                  <>
                  <Pagination.Ellipsis />
                  <Pagination.Item onClick={()=>handlerPages("last_page")}>{pages}</Pagination.Item> 
                  </>
                  }
                </>
              )}

            </React.Fragment>
          );
        })}
        <Pagination.Next  onClick={()=>handlerPages("next")} />
        <Pagination.Last  onClick={()=>handlerPages("last_page")} />
      </Pagination>
    </Container>
  );
};
