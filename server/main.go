package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

//MyError ...
type MyError struct {
	Err string `json:"err"`
}

func main() {

	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
	})
	router.HandleFunc("/parse", Parse).Methods("POST")
	router.HandleFunc("/contains", Contains).Methods("POST")

	handler := cors.Default().Handler(router)
	fmt.Println("Server is running on port 8000")
	log.Fatal(http.ListenAndServe(":8000", handler))

}

//Parse ...
func Parse(w http.ResponseWriter, req *http.Request) {

	body, error := ioutil.ReadAll(req.Body)
	if error != nil {
		log.Fatal(error)
	}
	formValues := make(map[string]string)
	err := json.Unmarshal(body, &formValues)
	if err != nil {
		log.Fatal(err)
	}

	htmlBody, _ := http.Get(formValues["endpoint"])
	tag := formValues["tag"]

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(htmlBody.Body)
	if err != nil {
		log.Fatal(err)
	}

	tags := []map[string]string{}
	doc.Find(tag).Each(func(i int, s *goquery.Selection) {

		// For each tag found, get the innderText and innerHtml
		t := s.Text()
		in, _ := s.Html()

		items := make(map[string]string)
		items["innerHtml"] = in
		items["innerText"] = t
		tags = append(tags, items)

	})
	data := map[string][]map[string]string{tag: tags}

	e := json.NewEncoder(w).Encode(data)

	if e != nil {

		myError := MyError{}
		myError.Err = "Incorrect form values!"

		e := json.NewEncoder(w).Encode(&myError)
		if e != nil {
			log.Fatal(err)
		}

	}
}

//Contains ...
func Contains(w http.ResponseWriter, req *http.Request) {

	body, error := ioutil.ReadAll(req.Body)
	if error != nil {
		log.Fatal(error)
	}
	formValues := make(map[string]string)
	err := json.Unmarshal(body, &formValues)
	if err != nil {
		log.Fatal(err)
	}

	htmlBody, _ := http.Get(formValues["endpoint"])
	tag := formValues["tag"]
	text := formValues["text"]

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(htmlBody.Body)
	if err != nil {
		log.Fatal(err)
	}

	exists := false
	doc.Find(tag).Each(func(i int, s *goquery.Selection) {

		// For each tag exists, compare the innderText with text
		t := s.Text()
		exists = strings.Contains(text, t)
		if exists {
			return
		}

	})
	res := make(map[string]bool)
	res["exists"] = exists
	e := json.NewEncoder(w).Encode(res)
	if e != nil {
		log.Fatal(err)
	}
}
