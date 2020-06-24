const fs = require("fs");

class Convertor {
  constructor() {
    this.output = "";
  }

  checkType(value, name) {
    if (typeof value === "number") {
      this.numberConvertor(value, name);
    } else if (typeof value === "string") {
      this.stringConvertor(value, name);
    } else if (typeof value === "boolean") {
      this.booleanConvertor(value, name);
    } else if (value === null) {
      this.nullConvertor(null, name);
    } else if (Array.isArray(value)) {
      this.arrayConvertor(value, name);
    } else if (typeof value === "object") {
      this.objectConvertor(value, name);
      console.log(value);
    }
  }

  JSONToXML(inputPath, outputPath) {
    fs.readFile(inputPath, "utf8", (err, data) => {
      this.output = "";

      if (!err) {
        const res = JSON.parse(data);
        console.log(typeof res);
        this.checkType(res);
      }

      console.log(this.output);
      fs.writeFile(outputPath, this.output, (err) => {
        if (!err) {
          console.log("Data has been saved successfully");
        }
      });
    });
  }

  numberConvertor = (value, name) => {
    this.output += `<number${
      name ? ' name="' + name + '"' : ""
    }>${value}</number>`;
  };

  booleanConvertor = (value, name) => {
    this.output += `<boolean${
      name ? ' name="' + name + '"' : ""
    }>${value}</boolean>`;
  };

  stringConvertor(value, name) {
    this.output += `<string${
      name ? ' name="' + name + '"' : ""
    }>${value}</string>`;
  }

  nullConvertor(value, name) {
    this.output += `<null${name ? ' name="' + name + '"' : ""}/>`;
  }

  objectConvertor(res, name) {
    this.output += `<object${name ? ' name="' + name + '"' : ""}>`;
    for (const [key, value] of Object.entries(res)) {
      this.checkType(value, key);
    }
    this.output += `</object>`;
  }

  arrayConvertor(value, name) {
    this.output += `<array${name ? ' name="' + name + '"' : ""}>`;
    for (let i = 0; i < value.length; i++) {
      this.checkType(value[i]);
    }
    this.output += `</array>`;
  }
}

const ConvertorInstance = new Convertor();
// Object.freeze(ConvertorInstance);

module.exports = ConvertorInstance;
