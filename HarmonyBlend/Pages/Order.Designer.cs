namespace HarmonyBlend.Pages
{
	partial class Order
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle3 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle4 = new DataGridViewCellStyle();
			orderPage_panel = new Panel();
			filters_groupBox = new GroupBox();
			productName_textBox = new TextBox();
			label3 = new Label();
			label2 = new Label();
			label1 = new Label();
			panel3 = new Panel();
			panel2 = new Panel();
			dataGridView1 = new DataGridView();
			Image = new DataGridViewImageColumn();
			Favorite = new DataGridViewCheckBoxColumn();
			Check = new DataGridViewCheckBoxColumn();
			PCode = new DataGridViewTextBoxColumn();
			PName = new DataGridViewTextBoxColumn();
			Amount = new DataGridViewTextBoxColumn();
			Unit = new DataGridViewTextBoxColumn();
			ListPrice = new DataGridViewTextBoxColumn();
			TotalPrice = new DataGridViewTextBoxColumn();
			orderPage_panel.SuspendLayout();
			filters_groupBox.SuspendLayout();
			panel2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// orderPage_panel
			// 
			orderPage_panel.Controls.Add(filters_groupBox);
			orderPage_panel.Controls.Add(label1);
			orderPage_panel.Dock = DockStyle.Top;
			orderPage_panel.Location = new Point(0, 0);
			orderPage_panel.Name = "orderPage_panel";
			orderPage_panel.Size = new Size(1233, 168);
			orderPage_panel.TabIndex = 0;
			// 
			// filters_groupBox
			// 
			filters_groupBox.Controls.Add(productName_textBox);
			filters_groupBox.Controls.Add(label3);
			filters_groupBox.Controls.Add(label2);
			filters_groupBox.ForeColor = SystemColors.Control;
			filters_groupBox.Location = new Point(12, 62);
			filters_groupBox.Name = "filters_groupBox";
			filters_groupBox.Size = new Size(312, 95);
			filters_groupBox.TabIndex = 2;
			filters_groupBox.TabStop = false;
			filters_groupBox.Text = "Filtre";
			// 
			// productName_textBox
			// 
			productName_textBox.Location = new Point(93, 56);
			productName_textBox.Name = "productName_textBox";
			productName_textBox.Size = new Size(197, 23);
			productName_textBox.TabIndex = 4;
			// 
			// label3
			// 
			label3.AutoSize = true;
			label3.ForeColor = SystemColors.Control;
			label3.Location = new Point(20, 59);
			label3.Name = "label3";
			label3.Size = new Size(57, 15);
			label3.TabIndex = 3;
			label3.Text = "Ürün Adı:";
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.ForeColor = SystemColors.Control;
			label2.Location = new Point(20, 30);
			label2.Name = "label2";
			label2.Size = new Size(67, 15);
			label2.TabIndex = 3;
			label2.Text = "Ürün Kodu:";
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(12, 9);
			label1.Name = "label1";
			label1.Size = new Size(225, 36);
			label1.TabIndex = 1;
			label1.Text = "ORDER PAGE";
			// 
			// panel3
			// 
			panel3.Dock = DockStyle.Bottom;
			panel3.Location = new Point(0, 589);
			panel3.Name = "panel3";
			panel3.Size = new Size(1233, 63);
			panel3.TabIndex = 1;
			// 
			// panel2
			// 
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 168);
			panel2.Name = "panel2";
			panel2.Size = new Size(1233, 421);
			panel2.TabIndex = 2;
			// 
			// dataGridView1
			// 
			dataGridView1.AllowUserToAddRows = false;
			dataGridView1.AllowUserToDeleteRows = false;
			dataGridView1.AllowUserToOrderColumns = true;
			dataGridViewCellStyle1.BackColor = Color.FromArgb(224, 224, 224);
			dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCellsExceptHeaders;
			dataGridView1.BackgroundColor = Color.FromArgb(39, 47, 59);
			dataGridView1.BorderStyle = BorderStyle.None;
			dataGridView1.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle2.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 162);
			dataGridViewCellStyle2.ForeColor = SystemColors.Window;
			dataGridViewCellStyle2.SelectionBackColor = Color.Silver;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.True;
			dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
			dataGridView1.ColumnHeadersHeight = 30;
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { Image, Favorite, Check, PCode, PName, Amount, Unit, ListPrice, TotalPrice });
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = Color.Gainsboro;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.ControlText;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			dataGridView1.DefaultCellStyle = dataGridViewCellStyle3;
			dataGridView1.Dock = DockStyle.Fill;
			dataGridView1.Location = new Point(0, 0);
			dataGridView1.MultiSelect = false;
			dataGridView1.Name = "dataGridView1";
			dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle4.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dataGridViewCellStyle4.ForeColor = SystemColors.Window;
			dataGridViewCellStyle4.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle4.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle4.WrapMode = DataGridViewTriState.True;
			dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			dataGridView1.Size = new Size(1233, 421);
			dataGridView1.TabIndex = 0;
			// 
			// Image
			// 
			Image.HeaderText = "Image";
			Image.Name = "Image";
			// 
			// Favorite
			// 
			Favorite.HeaderText = "Favorite";
			Favorite.Name = "Favorite";
			// 
			// Check
			// 
			Check.HeaderText = "Check";
			Check.Name = "Check";
			// 
			// PCode
			// 
			PCode.HeaderText = "P.Code";
			PCode.Name = "PCode";
			// 
			// PName
			// 
			PName.HeaderText = "P.Name";
			PName.Name = "PName";
			// 
			// Amount
			// 
			Amount.HeaderText = "Amount";
			Amount.Name = "Amount";
			// 
			// Unit
			// 
			Unit.HeaderText = "Unit";
			Unit.Name = "Unit";
			// 
			// ListPrice
			// 
			ListPrice.HeaderText = "List Price";
			ListPrice.Name = "ListPrice";
			// 
			// TotalPrice
			// 
			TotalPrice.HeaderText = "Total Price";
			TotalPrice.Name = "TotalPrice";
			// 
			// Order
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1233, 652);
			Controls.Add(panel2);
			Controls.Add(panel3);
			Controls.Add(orderPage_panel);
			FormBorderStyle = FormBorderStyle.None;
			Name = "Order";
			Text = "SubPage1";
			Load += Order_Load;
			orderPage_panel.ResumeLayout(false);
			orderPage_panel.PerformLayout();
			filters_groupBox.ResumeLayout(false);
			filters_groupBox.PerformLayout();
			panel2.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion

		private Panel orderPage_panel;
		private Panel panel3;
		private Panel panel2;
		private DataGridView dataGridView1;
		private Label label1;
		private GroupBox filters_groupBox;
		private Label label2;
		private TextBox productName_textBox;
		private Label label3;
		private DataGridViewImageColumn Image;
		private DataGridViewCheckBoxColumn Favorite;
		private DataGridViewCheckBoxColumn Check;
		private DataGridViewTextBoxColumn PCode;
		private DataGridViewTextBoxColumn PName;
		private DataGridViewTextBoxColumn Amount;
		private DataGridViewTextBoxColumn Unit;
		private DataGridViewTextBoxColumn ListPrice;
		private DataGridViewTextBoxColumn TotalPrice;
	}
}