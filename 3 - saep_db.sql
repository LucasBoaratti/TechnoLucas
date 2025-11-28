-- Criação do banco de dados
CREATE DATABASE saep_db;

-- Usando o banco de dados
USE saep_db;

-- Populando a tabela de produtos
INSERT INTO Produtos (nome, tipo, quantidade_estoque, preco, descricao, responsavel)
VALUES 
    ("Notebook HP", "Notebook", 100, 99.99, "Um notebook excelente para você trabalhar a vontade em sua casa ou até na empresa!", 1),
    ("SmartTV Sansung", "SmartTV", 50, 2.999, "SmartTV 4K UHD com acesso a aplicativos de streaming e integração com assistentes virtuais.", 1),
    ("Smartphone Motorola Edge 40", "Smartphone", 200, 999.99, "Smartphone moderno com câmera de alta resolução, bateria de longa duração e tela OLED.", 1);

-- Populando a tabela de históricos
INSERT INTO Historicos (responsavel, produto)
VALUES
    (1, 1),
    (1, 2),
    (1, 3);

-- Populando a tabela de movimentações
INSERT INTO Movimentacoes (quantidade_produtos, tipo_movimentacao, responsavel, produto)
VALUES
    (10, "Entrada", 1, 1),
    (5, "Saída", 1, 2),
    (20, "Entrada", 1, 3),