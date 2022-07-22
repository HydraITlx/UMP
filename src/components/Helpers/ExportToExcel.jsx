import ReactExport from "react-export-excel";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import IconButton from "@mui/material/IconButton";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExportToExcel({ data }) {
  const GeralSheet = data.filter((data) =>
    JSON.stringify(data).includes(`"Type":1`)
  );

  const SubstControladas = data.filter((data) =>
    JSON.stringify(data).includes(`"Type":2`)
  );

  const DispositivosMedicos = data.filter((data) =>
    JSON.stringify(data).includes(`"Type":3`)
  );

  const Outros = data.filter((data) =>
    JSON.stringify(data).includes(`"Type":4`)
  );

  const Nutricao = data.filter((data) =>
    JSON.stringify(data).includes(`"Type":5`)
  );

  const Soros = data.filter((data) =>
    JSON.stringify(data).includes(`"Type":6`)
  );

  return (
    <ExcelFile
      element={
        <IconButton>
          <SaveAltIcon />
        </IconButton>
      }
      filename="Lista de Produtos"
    >
      <ExcelSheet data={GeralSheet} name="Geral">
        <ExcelColumn label="Ano" value="Year" />
        <ExcelColumn label="CHNM_CNP" value="CHNM" />
        <ExcelColumn label="Descricao" value="Description" />
        <ExcelColumn label="Quantidade_total" value="Total_Quantity" />
        <ExcelColumn label="Laboratorio" value="Laboratory_Name" />
        <ExcelColumn label="Preco_Unid" value="Unit_Price_UN" />
        <ExcelColumn label="Preco_Caixa" value="Unit_Price_Box" />
        <ExcelColumn label="Observ" value="Observations" />
        <ExcelColumn label="DUP" value="DUP" />
        <ExcelColumn label="Nome_Comercial" value="Commercial_Name" />
        <ExcelColumn label="Iva" value="Tax_Percentage" />
        <ExcelColumn label="Familia_CFT" value="CFT_Family" />
        <ExcelColumn label="CFT" value="CFT" />
      </ExcelSheet>
      <ExcelSheet data={SubstControladas} name="Subst_Controladas">
        <ExcelColumn label="Ano" value="Year" />
        <ExcelColumn label="CHNM_CNP" value="CHNM" />
        <ExcelColumn label="Descricao" value="Description" />
        <ExcelColumn label="Quantidade_total" value="Total_Quantity" />
        <ExcelColumn label="Laboratorio" value="Laboratory_Name" />
        <ExcelColumn label="Preco_Unid" value="Unit_Price_UN" />
        <ExcelColumn label="Preco_Caixa" value="Unit_Price_Box" />
        <ExcelColumn label="Observ" value="Observations" />
        <ExcelColumn label="DUP" value="DUP" />
        <ExcelColumn label="Nome_Comercial" value="Commercial_Name" />
        <ExcelColumn label="Iva" value="Tax_Percentage" />
        <ExcelColumn label="Familia_CFT" value="CFT_Family" />
        <ExcelColumn label="CFT" value="CFT" />
        <ExcelColumn label="Esgotados" value="Sold_Out" />
      </ExcelSheet>
      <ExcelSheet data={DispositivosMedicos} name="Dispositivos_Medicos">
        <ExcelColumn label="Ano" value="Year" />
        <ExcelColumn label="CHNM_CNP" value="CHNM" />
        <ExcelColumn label="Descricao" value="Description" />
        <ExcelColumn label="Quantidade_total" value="Total_Quantity" />
        <ExcelColumn label="Laboratorio" value="Laboratory_Name" />
        <ExcelColumn label="Preco_Unid" value="Unit_Price_UN" />
        <ExcelColumn label="Preco_Caixa" value="Unit_Price_Box" />
        <ExcelColumn label="Observ" value="Observations" />
        <ExcelColumn label="DUP" value="DUP" />
        <ExcelColumn label="Nome_Comercial" value="Commercial_Name" />
        <ExcelColumn label="Iva" value="Tax_Percentage" />
        <ExcelColumn label="Familia_CFT" value="CFT_Family" />
        <ExcelColumn label="CFT" value="CFT" />
        <ExcelColumn label="Esgotados" value="Sold_Out" />
      </ExcelSheet>
      <ExcelSheet data={Outros} name="Outros">
        <ExcelColumn label="Ano" value="Year" />
        <ExcelColumn label="CHNM_CNP" value="CHNM" />
        <ExcelColumn label="Descricao" value="Description" />
        <ExcelColumn label="Quantidade_total" value="Total_Quantity" />
        <ExcelColumn label="Laboratorio" value="Laboratory_Name" />
        <ExcelColumn label="Preco_Unid" value="Unit_Price_UN" />
        <ExcelColumn label="Preco_Caixa" value="Unit_Price_Box" />
        <ExcelColumn label="Observ" value="Observations" />
        <ExcelColumn label="DUP" value="DUP" />
        <ExcelColumn label="Nome_Comercial" value="Commercial_Name" />
        <ExcelColumn label="Iva" value="Tax_Percentage" />
        <ExcelColumn label="Familia_CFT" value="CFT_Family" />
        <ExcelColumn label="CFT" value="CFT" />
        <ExcelColumn label="Esgotados" value="Sold_Out" />
      </ExcelSheet>
      <ExcelSheet data={Nutricao} name="Nutricao">
        <ExcelColumn label="Ano" value="Year" />
        <ExcelColumn label="CHNM_CNP" value="CHNM" />
        <ExcelColumn label="Descricao" value="Description" />
        <ExcelColumn label="Quantidade_total" value="Total_Quantity" />
        <ExcelColumn label="Laboratorio" value="Laboratory_Name" />
        <ExcelColumn label="Preco_Unid" value="Unit_Price_UN" />
        <ExcelColumn label="Preco_Caixa" value="Unit_Price_Box" />
        <ExcelColumn label="Observ" value="Observations" />
        <ExcelColumn label="DUP" value="DUP" />
        <ExcelColumn label="Nome_Comercial" value="Commercial_Name" />
        <ExcelColumn label="Iva" value="Tax_Percentage" />
        <ExcelColumn label="Familia_CFT" value="CFT_Family" />
        <ExcelColumn label="CFT" value="CFT" />
        <ExcelColumn label="Esgotados" value="Sold_Out" />
      </ExcelSheet>
      <ExcelSheet data={Soros} name="Soros">
        <ExcelColumn label="Ano" value="Year" />
        <ExcelColumn label="CHNM_CNP" value="CHNM" />
        <ExcelColumn label="Descricao" value="Description" />
        <ExcelColumn label="Quantidade_total" value="Total_Quantity" />
        <ExcelColumn label="Laboratorio" value="Laboratory_Name" />
        <ExcelColumn label="Preco_Unid" value="Unit_Price_UN" />
        <ExcelColumn label="Preco_Caixa" value="Unit_Price_Box" />
        <ExcelColumn label="Observ" value="Observations" />
        <ExcelColumn label="DUP" value="DUP" />
        <ExcelColumn label="Nome_Comercial" value="Commercial_Name" />
        <ExcelColumn label="Iva" value="Tax_Percentage" />
        <ExcelColumn label="Familia_CFT" value="CFT_Family" />
        <ExcelColumn label="CFT" value="CFT" />
        <ExcelColumn label="Esgotados" value="Sold_Out" />
      </ExcelSheet>
    </ExcelFile>
  );
}
