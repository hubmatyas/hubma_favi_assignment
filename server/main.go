package main

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"github.com/gin-gonic/gin"
)

type ProductDetail struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Photo       string `json:"photo"`
	Description string `json:"description"`
	Price       string `json:"price"`
	Parameters  []struct {
		Name  string `json:"name"`
		Value string `json:"value"`
	} `json:"parameters"`
}

var productCache []ProductDetail

func getDetail(c *gin.Context) {
	id := c.Query("id")

	if id == "" {
		c.JSON(200, productCache)
		return
	}

	for _, product := range productCache {
		if product.ID == id {
			c.JSON(200, product)
			return
		}
	}

	c.JSON(404, gin.H{"error": "Product not found"})
}

func main() {
	data, err := ioutil.ReadFile("data.json")
	if err != nil {
		log.Fatalf("Failed to read JSON file: %v", err)
	}

	err = json.Unmarshal(data, &productCache)
	if err != nil {
		log.Fatalf("Failed to unmarshal JSON: %v", err)
	}

	r := gin.Default()
	r.GET("/detail", getDetail)
	r.Run(":8000")
}
