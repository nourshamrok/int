package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
)

// Item struct represents a simple item in our API
type Item struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price float64 `json:"price"`
}

var (
	items      = make(map[int]Item)
	lastID     = 0
	mutex      sync.RWMutex
)

// GetItemsHandler returns the list of all items
func GetItemsHandler(w http.ResponseWriter, r *http.Request) {
	mutex.RLock()
	defer mutex.RUnlock()

	// Convert the map of items to a slice
	var itemList []Item
	for _, item := range items {
		itemList = append(itemList, item)
	}

	// Convert the slice to JSON and write to response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(itemList)
}

// GetItemHandler returns a specific item by ID
func GetItemHandler(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	id, err := strconv.Atoi(params.Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	mutex.RLock()
	defer mutex.RUnlock()

	item, found := items[id]
	if !found {
		http.Error(w, "Item not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}

// CreateItemHandler creates a new item
func CreateItemHandler(w http.ResponseWriter, r *http.Request) {
	var newItem Item

	// Decode the JSON request body
	err := json.NewDecoder(r.Body).Decode(&newItem)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	mutex.Lock()
	defer mutex.Unlock()

	// Assign a new ID and add the item to the map
	lastID++
	newItem.ID = lastID
	items[newItem.ID] = newItem

	w.WriteHeader(http.StatusCreated)
}

// UpdateItemHandler updates an existing item by ID
func UpdateItemHandler(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	id, err := strconv.Atoi(params.Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	var updatedItem Item

	// Decode the JSON request body
	err = json.NewDecoder(r.Body).Decode(&updatedItem)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	mutex.Lock()
	defer mutex.Unlock()

	// Check if the item exists
	_, found := items[id]
	if !found {
		http.Error(w, "Item not found", http.StatusNotFound)
		return
	}

	// Update the item in the map
	updatedItem.ID = id
	items[id] = updatedItem

	w.WriteHeader(http.StatusOK)
}

// DeleteItemHandler deletes an item by ID
func DeleteItemHandler(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	id, err := strconv.Atoi(params.Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	mutex.Lock()
	defer mutex.Unlock()

	// Check if the item exists
	_, found := items[id]
	if !found {
		http.Error(w, "Item not found", http.StatusNotFound)
		return
	}

	// Delete the item from the map
	delete(items, id)

	w.WriteHeader(http.StatusOK)
}

func main() {
	// Define API routes
	http.HandleFunc("/items", GetItemsHandler)
	http.HandleFunc("/item", GetItemHandler)
	http.HandleFunc("/create", CreateItemHandler)
	http.HandleFunc("/update", UpdateItemHandler)
	http.HandleFunc("/delete", DeleteItemHandler)

	// Start the server on port 8080
	port := 8080
	fmt.Printf("Server is running on port %d...\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}