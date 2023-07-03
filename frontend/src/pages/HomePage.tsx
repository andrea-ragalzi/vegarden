import BottomBar from './../components/BottomBar';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    return (
        <Container className='h-100'>
            <Row>
                <Col>
                    <h1>

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero libero, convallis et elit at, volutpat posuere felis. Pellentesque aliquam nisl sem, id volutpat ante dictum non. In molestie laoreet ex ac pretium. Ut vel elementum turpis. Proin molestie tincidunt luctus. Aliquam sed dui vitae nulla porttitor congue. Maecenas at nisl et risus gravida scelerisque et in nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat nunc ac ipsum semper, et rhoncus nisl lobortis. Etiam aliquam consectetur arcu, sed efficitur justo.

                        Nullam porttitor augue eget metus sagittis iaculis. In sodales sollicitudin sem, a porttitor mauris ullamcorper sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a ex pulvinar tellus dapibus vulputate a eget massa. Cras eget tempor dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mauris mauris, ullamcorper eget lorem non, porta scelerisque tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ultrices interdum elit. Maecenas nec euismod neque. Praesent posuere mollis augue, a sodales velit aliquet non. Cras tempor, justo lobortis aliquam tempor, velit erat faucibus eros, id consectetur nunc odio a enim.

                        Maecenas laoreet dolor eu lobortis consequat. Nullam porta, urna posuere efficitur tempor, libero velit finibus erat, quis consequat ligula erat sed elit. Nunc id nibh turpis. Integer ac interdum tortor, et tempus dolor. Sed id dapibus massa, ultricies maximus lectus. Quisque laoreet viverra sapien vel dapibus. Suspendisse ac leo quis nibh pretium porttitor.

                        Curabitur at ligula nunc. Vivamus sem turpis, posuere sed odio eget, viverra dapibus dui. Nunc rhoncus augue orci, eget dapibus neque ultrices sed. Quisque eget arcu ut ante pretium sollicitudin. Phasellus lorem ante, varius et dui a, dapibus ultricies tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla suscipit risus id erat finibus, tempus fermentum lectus interdum. Vestibulum mi dui, molestie in tempus non, mollis at nunc. Maecenas interdum urna vel porta consequat. Duis vel nisl nec urna sollicitudin iaculis ac in sem.

                        Proin volutpat consequat ullamcorper. Proin imperdiet vestibulum pellentesque. Donec at augue in est malesuada tincidunt ac non libero. Aenean ultrices dui nec pulvinar iaculis. Duis tempus non augue ac rutrum. Pellentesque pulvinar porttitor vulputate. Suspendisse mattis, ipsum sit amet viverra fermentum, ante ipsum facilisis magna, et ornare diam ante in nibh. Fusce id lectus nulla. Morbi a ex eget elit viverra laoreet ut eu lectus. Donec porttitor enim risus, ut vulputate justo ultrices a. Aliquam venenatis metus sit amet finibus tempus. Ut nec bibendum odio, sit amet volutpat dui. Maecenas in vulputate risus. Cras pharetra molestie leo. Sed et scelerisque nisi, nec tristique leo. </h1>
                </Col>
                <Col>
                    <BottomBar></BottomBar>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;