import express from 'express';
const app = express();
const port = 3000;
app.use(express.json());

app.post('/youtubeoptiontesting', (req, res) => {
    const { handle } = req.body;
    res.json({ message: `Received handle: ${handle}` });
});


async function test() {
    let response = await fetch("http://localhost:3000/youtubeoptiontesting", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            handle: 10
        })
    });

    let data = await response.json();
    console.log(data);
}

app.listen(port, ()=> {
    console.log("Listening...")
})
test()