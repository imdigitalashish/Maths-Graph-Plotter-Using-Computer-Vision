package main

import "github.com/otiai10/gosseract"

func main() {
	client := gosseract.NewClient()
	defer client.Close()
	client.SetImage("./alt_text_example.jpg")
	text, _ := client.Text()
	println(text)
}
