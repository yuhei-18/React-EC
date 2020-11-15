import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextInput, SelectBox, PrimaryButton } from "../components";
import { saveProduct } from "../reducks/products/operations";
import { ImageArea, SetSizeArea } from "../components/Products";
import { db } from "../firebase/index";

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/product/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [images, setImages] = useState([]),
        [price, setPrice] = useState(""),
        [sizes, setSizes] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, [setDescription]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  }, [setPrice]);

  const categorys = [
    {id: "tops", name: "トップス"},
    {id: "shirts", name: "シャツ"},
    {id: "pants", name: "パンツ"},
  ];

  const genders = [
    {id: "all", name: "すべて"},
    {id: "male", name: "メンズ"},
    {id: "female", name: "レディース"},
  ];

  useEffect(() => {
    if (id !== "") {
    db.collection("products").doc(id).get()
      .then(snapshot => {
        const data = snapshot.data();
        setImages(data.images);
        setName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setGender(data.gender);
        setPrice(data.price);
        setSizes(data.sizes);
      })
    }
  }, [id])

  return (
    <section>
      <h2>商品の登録・編集</h2>
      <ImageArea images={images} setImages={setImages} />
      <div>
        <TextInput
          fullWidth={true} label={"商品名"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <SelectBox 
          label={"カテゴリー"} required={true} options={categorys} select={setCategory} value={category}
        />
        <SelectBox 
          label={"性別"} required={true} options={genders} select={setGender} value={gender}
        />
        <TextInput
          fullWidth={true} label={"商品説明"} multiline={true} required={true}
          onChange={inputDescription} rows={5} value={description} type={"text"}
        />
        <TextInput
          fullWidth={true} label={"価格"} multiline={false} required={true}
          onChange={inputPrice} rows={1} value={price} type={"number"}
        />
      </div>
      <SetSizeArea sizes={sizes} setSizes={setSizes} />
      <div>
        <PrimaryButton
          label={"商品情報を保存"}
          onClick={() => dispatch(
            saveProduct(id, name, description, category, gender, price, images, sizes)
          )}
        />
      </div>
    </section>
  )
}

export default ProductEdit;
